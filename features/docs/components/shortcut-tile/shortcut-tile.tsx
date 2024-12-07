import React from 'react';
import Link from 'next/link';
import { GraphCMSImage } from 'components/widgets/graphcms-image';
import { Maybe } from 'graphql/generated';
import clsx from 'clsx';

import styles from './shortcut-tile.module.less';

interface ShortcutTileProps {
  title: string;
  url: string;
  label?: string;
  image?: Maybe<React.ComponentProps<typeof GraphCMSImage>['image']>;
  basis: string;
  large?: boolean;
}

export const ShortcutTile: React.FC<ShortcutTileProps> = props => {
  const { title, label, url, image, basis, large } = props;

  return (
    <Link
      href={url}
      className={clsx(styles.ShortcutTile, { [`${styles['ShortcutTile--large']}`]: large })}
      style={{
        flexBasis: large ? '47%' : basis,
        opacity: !url ? 0.5 : 1,
      }}
    >
      <>
        {!!image && <GraphCMSImage className={styles.img} objectFit="contain" image={image} alt={title || label} />}
        <p>{title || label}</p>
      </>
    </Link>
  );
};
