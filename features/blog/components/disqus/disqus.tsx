/* eslint-disable func-names */
/* eslint-disable react/no-this-in-sfc */

import React, { useEffect } from 'react';
import styles from './disqus.module.less';

interface DisqusProps {
  url: string;
  identifier: string;
}

export const Disqus: React.FC<DisqusProps> = props => {
  useEffect(() => {
    (window as any).disqus_config = createDisqusConfig(props);
    const script = document.createElement('script');
    script.src = 'https://trymagic.disqus.com/embed.js';
    script.setAttribute('data-timestamp', Date.now().toString());
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return <div className={styles.Disqus} id="disqus_thread" />;
};

/**
 * Creates a bound function that passes configuration to Disqus.
 *
 * @see https://help.disqus.com/en/articles/1717084-javascript-configuration-variables
 */
function createDisqusConfig({ url, identifier }: DisqusProps) {
  return function (this: { page: DisqusProps }) {
    this.page.url = url;
    this.page.identifier = identifier;
  };
}
