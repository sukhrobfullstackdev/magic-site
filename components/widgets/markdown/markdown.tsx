/* eslint-disable global-require */
import React, { useMemo, useCallback } from 'react';
import { Icon, Linkable, MonochromeIcons, TextButton, useToast } from '@magiclabs/ui';
import { useClipboard } from 'usable-react';
import { compileMarkdown } from 'lib/markdown/parse';

import styles from './markdown.module.less';

interface MarkdownProps {
  source?: string;
}

export const Markdown: React.FC<MarkdownProps> = props => {
  const { source = '' } = props;

  const renderedSource: any = useMemo(() => {
    return compileMarkdown(source, { createElement: React.createElement, components });
  }, [source]);

  return <div className={styles.Markdown}>{renderedSource}</div>;
};

const components = {
  a: ({ href, ...rest }) => {
    return (
      <Linkable>
        <>
          {/^(?:[a-z]+:)?\/\//i.test(href) ? (
            /* eslint-disable-next-line jsx-a11y/anchor-has-content */
            <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />
          ) : (
            /* eslint-disable-next-line jsx-a11y/anchor-has-content */
            <a href={href} {...rest} />
          )}
        </>
      </Linkable>
    );
  },

  pre: ({ children }) => {
    const { createToast } = useToast();
    const { copy, ref } = useClipboard();

    const onCopyRequest = useCallback(async () => {
      try {
        await copy();
        createToast({ type: 'success', message: 'Copied to clipboard!' });
      } catch {
        createToast({ type: 'error', message: 'Failed to copy to clipboard.' });
      }
    }, [copy, createToast]);

    return (
      <pre className={styles.copyContent}>
        <TextButton onPress={onCopyRequest}>
          <Icon type={MonochromeIcons.Copy} /> Copy
        </TextButton>
        <div ref={ref}>{children}</div>
      </pre>
    );
  },
};
