import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Flex, Spacer, Outset, TextButton, Media } from '@magiclabs/ui';
import { getPathFromURL } from 'lib/url-helpers';

import { TableOfContents } from 'components/widgets/table-of-contents';
import { Markdown } from 'components/widgets/markdown';

import styles from './legal-view.module.less';

export default function LegalView({ data, legalsideNavData }) {
  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
      </Head>

      <div className={styles.Layout}>
        <Flex.Row className={styles.row} horizontal="center">
          {/* Using percentage as the flex basis to accomodate for Different view point */}
          <Flex.Item className={styles.menuBarContainer} basis="17.666667%">
            <LegalNav legalsideNavData={legalsideNavData} />
          </Flex.Item>

          <Flex.Item className={styles.content}>
            <Spacer size={50} orientation="vertical" />
            <h1 className={styles.PageHeader}>Legal</h1>
            <Media lessThan="lg">
              <LegalNav legalsideNavData={legalsideNavData} />
            </Media>
            <LegalContent data={data} />
          </Flex.Item>

          <Flex.Item className={styles.tocContainer} basis="14.666667%">
            <Media greaterThanOrEqual="lg">
              <Spacer size={50} orientation="vertical" />
            </Media>
            <TableOfContents title={data.title} structure={data.tableOfContents} />
          </Flex.Item>
        </Flex.Row>
      </div>
    </>
  );
}

function LegalNav({ legalsideNavData }) {
  return (
    <>
      <Media greaterThanOrEqual="lg">
        <Spacer size={80} orientation="vertical" />
      </Media>
      <Flex.Column className={styles.LegalNav}>
        <LegalNavLinks legalsideNavData={legalsideNavData} size="md" />
      </Flex.Column>
    </>
  );
}

function LegalNavLinks({ size, legalsideNavData }) {
  const router = useRouter();

  return legalsideNavData.tree.map((cfg, i) => {
    return (
      <Flex.Column className={styles.navCategory} horizontal="flex-start" key={cfg.label}>
        <h4 className={styles.tabHeaders}>{cfg.label}</h4>
        {cfg.children.map(innerCfg => {
          return (
            <Link href={innerCfg.href} passHref key={cfg.label + innerCfg.label + innerCfg.href} legacyBehavior>
              <TextButton.a
                onPress={innerCfg.onPress}
                size={size}
                color={getPathFromURL(router.asPath) === getPathFromURL(innerCfg.href) ? 'primary' : 'tertiary'}
              >
                {innerCfg.label}
              </TextButton.a>
            </Link>
          );
        })}
        {i !== legalsideNavData.tree.length - 1 && size === 'md' && (
          <Media greaterThanOrEqual="lg">
            <Spacer size={40} orientation="vertical" />
          </Media>
        )}
      </Flex.Column>
    );
  });
}

function LegalContent({ data }) {
  return (
    <main className={styles.LegalContent}>
      <Media lessThan="lg">
        <div className={styles.divider} />
        <Spacer size={35} orientation="vertical" />
      </Media>

      <Media greaterThanOrEqual="lg">
        <Spacer size={50} orientation="vertical" />
      </Media>

      <div className={styles.header}>
        <div className={styles.effectiveDate}>
          Effective Date:
          {new Date(data.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
        <h2 className={styles.title}>{data.title}</h2>
      </div>

      <div className={styles.mainContent}>
        <Markdown source={data.content} />
      </div>

      <Spacer size={100} orientation="vertical" />
    </main>
  );
}
