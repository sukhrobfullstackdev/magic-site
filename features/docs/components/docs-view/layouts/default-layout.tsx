import React from 'react';
import type { DocsPageRenderData } from 'features/docs/docs-data';
import { DocsContent } from '../../docs-content';

interface DefaultLayoutProps {
  data: DocsPageRenderData;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = props => {
  const { data } = props;
  return <DocsContent data={data} />;
};
