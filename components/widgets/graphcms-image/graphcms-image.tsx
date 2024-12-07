import React from 'react';
import Image from '@graphcms/react-image';
import { clsx, mergeProps } from '@magiclabs/ui';
import { Maybe } from 'graphql/generated';

import styles from './graphcms-image.module.less';

type GraphCMSImageProps = Omit<React.ComponentProps<typeof Image>, 'image'> & {
  image?: {
    handle?: Maybe<string>;
    width?: Maybe<number>;
    height?: Maybe<number>;
  };
  objectFit?: 'contain' | 'cover' | 'fill' | 'scale-down';
  objectPosition?: 'center' | 'left' | 'right' | 'top' | 'bottom';
  maxHeight?: number;
};

export const GraphCMSImage: React.FC<GraphCMSImageProps> = props => {
  const { image, objectFit, objectPosition, maxHeight, ...otherProps } = props;

  if (image && image.handle) {
    const mergedProps: any = mergeProps(
      {
        className: clsx(
          styles.GraphCMSImage,
          styles[`objectFit_${objectFit}`],
          styles[`objectPosition_${objectPosition}`],
        ),
        image: {
          handle: image.handle,
          width: image.width ?? 0,
          height: image.height ?? 0,
        },
        style: {
          maxHeight: maxHeight == null ? undefined : maxHeight,
        },
      },
      otherProps,
    );

    return <Image {...mergedProps} />;
  }

  return null;
};
