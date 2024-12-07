import { GRAPHCMS_PREVIEW_SECRET } from 'constants/config';
import { Stage } from 'graphql/generated';
import { docsListing } from 'features/docs/graphql/queries';
import { graphcmsWritable } from 'lib/graphcms/clients/write';
import type { NextApiHandler } from 'next';
import { getAllSlugs, getDocsHref } from 'features/docs/docs-data';

const graphcmsDocsPreview: NextApiHandler = async (req, res) => {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== GRAPHCMS_PREVIEW_SECRET || !req.query.id) {
    return res.status(401).send('Invalid token');
  }

  // Fetch the headless CMS to check if the provided `slug` exists
  const listing: any = await graphcmsWritable.request(docsListing, { stage: Stage.Draft });
  const data = getAllSlugs(listing);
  const node = data.find(item => item.pageID === req.query.id);
  const slug = getDocsHref(node?.slug);

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!slug) {
    return res.status(401).send('Invalid slug');
  }

  // Enable Preview Mode
  res.setPreviewData(node ?? {});

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: slug });
  res.end();
};

export default graphcmsDocsPreview;
