import type { NextApiHandler } from 'next';
import { indexRichText } from 'lib/graphcms/rich-text-indexer';
import { postMetadata } from 'features/blog/graphql/posts';
import { createAndUploadAlgoliaRecordsForPost, removeObsoleteAlgoliaRecordsForPost } from 'features/blog/posts-indexer';
import { GRAPHCMS_WEBHOOK_SECRET } from 'constants/config';
import { graphcmsWritable } from 'lib/graphcms/clients/write';

const algoliaWebhook: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') return res.end();

  if (req.headers['authorization'] !== `Bearer ${GRAPHCMS_WEBHOOK_SECRET}`) {
    return res.status(401).send('Invalid token');
  }

  try {
    const { operation, data } = req.body;
    const { slug } = data;

    switch (operation) {
      case 'publish': {
        if (!data.content.json.children) {
          return res.status(400).send('Missing or malformed rich text AST.');
        }

        const post = await getPostMetadata(slug);
        await removeObsoleteAlgoliaRecordsForPost(slug);
        const richTextRecords = indexRichText(data.content.json.children);
        await createAndUploadAlgoliaRecordsForPost(post, richTextRecords);
        break;
      }

      case 'unpublish':
      case 'delete': {
        await removeObsoleteAlgoliaRecordsForPost(slug);
        break;
      }

      default:
        return res.status(400).send(`Invalid operation: ${operation}`);
    }

    res.send(201);
  } catch (err: any) {
    res.status(400).send(err?.message);
  }
};

async function getPostMetadata(slug: string) {
  const metadata: any = await graphcmsWritable.request(postMetadata, { slug });
  const { post } = metadata || {};

  if (!post) {
    throw new Error(`Could not find Post object for slug: ${slug}`);
  }

  return post;
}

export default algoliaWebhook;
