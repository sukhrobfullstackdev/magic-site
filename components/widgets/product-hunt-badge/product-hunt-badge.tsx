import React from 'react';

import styles from './product-hunt-badge.module.less';

/**
 * Renders an absolutely-positioned ProductHunt badge / button link.
 */
export const ProductHuntBadge: React.FC = () => {
  return (
    <div className={styles.ProductHuntBadge}>
      <a
        href="https://www.producthunt.com/posts/magic-11?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-magic-11"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=190558&theme=light"
          alt="Magic - Use the slickest magic link login in your app | Product Hunt Embed"
        />
      </a>
    </div>
  );
};
