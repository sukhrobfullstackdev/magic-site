import React from 'react';
import type { DocsPageRenderData } from 'features/docs/docs-data';
import { Flex, clsx } from '@magiclabs/ui';
import Link from 'next/link';
import { Maybe } from 'graphql/generated';
import { RichTextAST } from 'lib/graphcms/rich-text-indexer';
import type { EmbedReferences } from '@graphcms/rich-text-types';
import { RichText, WithRichTextStyles } from 'components/widgets/rich-text';
import { DocsContent, embedRenderers } from '../../docs-content';

import styles from './quickstart-layout.module.less';

interface QuickstartLayoutProps {
  data: DocsPageRenderData;
}

export const QuickstartLayout: React.FC<QuickstartLayoutProps> = props => {
  const { data } = props;

  return (
    <DocsContent
      data={data}
      beforeContentSlot={
        <QuickstartNavigator href={data.href} references={data.sharedContentReferences} content={data.sharedContent} />
      }
    />
  );
};

interface QuickstartNavigatorProps {
  href: string;
  content?: Maybe<RichTextAST>;
  references?: Maybe<EmbedReferences>;
}

const QuickstartNavigator: React.FC<QuickstartNavigatorProps> = props => {
  const { href, content, references } = props;

  const basePath = href.replace(/(\/cli|\/integration)$/, '');
  const activeRoute = href.split('/').slice().pop()!; // one of: "cli", "integration"

  return (
    <div className={styles.QuickstartNavigator}>
      {!!content && (
        <div className={styles.mainContent}>
          <WithRichTextStyles>
            <RichText content={content} embedRenderers={embedRenderers} references={references} />
          </WithRichTextStyles>
        </div>
      )}
      <h3>How do you want to get started?</h3>
      <Flex.Row horizontal="space-between" wrap>
        <Link href={`${basePath}/cli`} className={clsx(styles.card, activeRoute === 'cli' && styles.active)}>
          <>
            <div className={styles.iconContainer}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.5044 13.4079H8.90145V21.3272C8.90145 23.175 9.90187 23.549 11.1222 22.1631L19.4444 12.7039C20.4668 11.549 20.038 10.5921 18.4879 10.5921H15.0909V2.67282C15.0909 0.824977 14.0905 0.451009 12.8702 1.83689L4.54795 11.2961C3.53653 12.462 3.96528 13.4079 5.5044 13.4079Z"
                  stroke="#B6B4BA"
                  strokeWidth="2"
                />
              </svg>
              <div className={styles.recommended}>
                <p>Recommended</p>
              </div>
            </div>
            <h4>Build with CLI</h4>
            <p>Use our interactive CLI tool to set up and run a Magic app in less than 2 minutes</p>
          </>
        </Link>

        <Link
          href={`${basePath}/integration`}
          className={clsx(styles.card, activeRoute === 'integration' && styles.active)}
        >
          <>
            <div className={styles.iconContainer}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke="#B6B4BA"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="2" y="2" width="20" height="20" rx="4" strokeWidth="2" />
                <path d="M2 6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V7H2V6Z" strokeWidth="2" />
                <path d="M8 7L8 2" strokeWidth="2" strokeLinecap="round" />
                <path d="M9 17L6 14.5L9 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 17L18 14.5L15 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h4>Integrate into a Next.js app</h4>
            <p>Add Magic to a new or existing Next.js app</p>
          </>
        </Link>
      </Flex.Row>
    </div>
  );
};
