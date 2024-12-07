import { GRAPHCMS_PREVIEW_SECRET } from 'constants/config';
import { Stage } from 'graphql/generated';
import { postContent } from 'features/blog/graphql/posts';
import { graphcmsWritable } from 'lib/graphcms/clients/write';
import type { NextApiHandler } from 'next';

const graphcmsPostPreview: NextApiHandler = async (req, res) => {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== GRAPHCMS_PREVIEW_SECRET || !req.query.slug) {
    return res.status(401).send('Invalid token');
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  const content: any = await graphcmsWritable.request(postContent, {
    slug: req.query.slug as string,
    stage: Stage.Draft,
  });
  const { post } = content || {};

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(401).send('Invalid slug');
  }

  // Enable Preview Mode
  res.setPreviewData({});

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: `/posts/${post.slug}` });
  res.end();
};

export default graphcmsPostPreview;
