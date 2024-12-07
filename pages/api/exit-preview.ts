import type { NextApiHandler } from 'next';

const exitPreviewMode: NextApiHandler = (_, res) => {
  res.clearPreviewData();
  res.writeHead(307, { Location: '/' });
  res.end();
};

export default exitPreviewMode;
