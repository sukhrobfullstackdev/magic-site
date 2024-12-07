import React from 'react';
import { Media, Spacer } from '@magiclabs/ui';

interface ResponsiveSpacerProps {
  mdSize?: string | number;
  lgSize?: string | number;
  xlSize?: string | number;
  orientation?: 'vertical' | 'horizontal';
}

export const ResponsiveSpacer: React.FC<ResponsiveSpacerProps> = ({
  mdSize,
  lgSize,
  xlSize,
  orientation = 'vertical',
}) => {
  return (
    <>
      <Media lessThan="md">
        <Spacer size={mdSize} orientation={orientation} />
      </Media>

      <Media between={['md', 'xl']}>
        <Spacer size={lgSize} orientation={orientation} />
      </Media>

      <Media greaterThanOrEqual="xl">
        <Spacer size={xlSize} orientation={orientation} />
      </Media>
    </>
  );
};
