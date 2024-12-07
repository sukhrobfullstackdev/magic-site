import React from 'react';
import { Flex, clsx } from '@magiclabs/ui';
import { FeatureRow } from './feature-row';

type FeatureItem = {
  description: string;
};

type Props = {
  title?: string;
  features: FeatureItem[];
};

export const FeatureList = ({ title, features }: Props) => {
  return (
    <Flex.Column style={{ gap: '16px' }}>
      {title && <h6 className={clsx('typography-h6')}>{title}</h6>}
      {features.map(v => (
        <FeatureRow key={v.description} {...v} />
      ))}
    </Flex.Column>
  );
};
