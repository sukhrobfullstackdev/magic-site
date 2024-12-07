/* eslint-disable react/destructuring-assignment */

import React, { ReactNode, createContext, useContext, useMemo } from 'react';
import type { EmbedReferences, NodeRendererType } from '@graphcms/rich-text-types';
import { RichText as GraphCMSRichText } from '@graphcms/rich-text-react-renderer';
import { Alert, clsx, Linkable } from '@magiclabs/ui';
import matter from 'gray-matter';
import { Maybe } from 'graphql/generated';
import { reduceInnerText, RichTextAST } from 'lib/graphcms/rich-text-indexer';
import { capitalize, kebabCase, toLower } from 'lodash';
import Image from '@graphcms/react-image';
import Link from 'next/link';
import { Language } from 'prism-react-renderer';
import { CodeBlock } from '../code-block';
import { codeLanguagesMapper } from '../../../lib/code-language';

import styles from './rich-text.module.less';

interface RichTextProps {
  content?: Maybe<RichTextAST>;
  references?: Maybe<EmbedReferences>;
  embedRenderers?: NodeRendererType['embed'];
}

export const RichText: React.FC<RichTextProps> = props => {
  const { content, references, embedRenderers } = props;

  if (!content) {
    return null;
  }

  const renderersWrapped = useMemo(() => {
    const embedRenderersWrapped = {};

    for (const [type, renderer] of Object.entries(embedRenderers || {})) {
      embedRenderersWrapped[type] = (...args: any[]) => {
        // @ts-ignore
        return <WithoutRichTextStyles>{renderer?.(...(args as any))}</WithoutRichTextStyles>;
      };
    }

    return { ...renderers, embed: embedRenderersWrapped };
  }, [embedRenderers]);

  // Modify the content AST to add linkable slugs for each heading 1-3
  const modifiedChildren: any = useMemo(() => {
    const seenSlugs: Record<string, number> = {};

    return (Array.isArray(content) ? content : content?.children ?? []).map((node: any) => {
      if (['heading-one', 'heading-two', 'heading-three'].includes(node.type)) {
        const innerText = reduceInnerText(node).trim();
        const id = /\s/.test(innerText) ? kebabCase(innerText) : toLower(innerText); // backwards compat

        const slug = seenSlugs[id] != null ? `${id}-${seenSlugs[id]++}` : id;
        if (seenSlugs[id] == null) seenSlugs[id] = 0;

        return {
          ...node,
          slug,
        };
      }
      return node;
    });
  }, [content]);

  return (
    <div className={styles.RichText}>
      <div>
        <GraphCMSRichText content={modifiedChildren} references={references ?? []} renderers={renderersWrapped} />
      </div>
    </div>
  );
};

interface WithRichTextStylesProps {
  children: React.ReactNode;
}

export const WithRichTextStyles: React.FC<WithRichTextStylesProps> = props => {
  const { children } = props;
  return <div className={clsx(styles.RichText, styles.withStyle)}>{children}</div>;
};

interface WithoutRichTextStylesProps {
  children: React.ReactNode;
}

export const WithoutRichTextStyles: React.FC<WithoutRichTextStylesProps> = props => {
  const { children } = props;
  return <div className={styles.noStyle}>{children}</div>;
};

export type EmbedRenderers = NodeRendererType['embed'];

// --- Custom renderers ----------------------------------------------------- //

interface AdmonitionProps {
  admonitionType: `admonition:${string}`;
  alertType: NonNullable<React.ComponentProps<typeof Alert>['type']>;
  children: ReactNode;
}

const AdmonitionContext = createContext<Partial<AdmonitionProps> | null>(null);

const Admonition: React.FC<AdmonitionProps> = ({ admonitionType, alertType, children }) => {
  const label = admonitionType.split(':')[1];
  return (
    <AdmonitionContext.Provider value={{ admonitionType, alertType }}>
      <div className={styles.Admonition}>
        <Alert label={label} type={alertType}>
          <div className={clsx(styles.content, styles[alertType])}>{children}</div>
        </Alert>
      </div>
    </AdmonitionContext.Provider>
  );
};

const LinkableHeading: React.FC<{ lvl: number; children: ReactNode }> = ({ lvl, children, ...otherProps }) => {
  const { slug } = otherProps as any;

  if (React.isValidElement(children)) {
    const link = (
      <>
        <span id={slug} className={styles.target} />
        <a className={styles.link} href={`#${slug}`}>
          <span className={styles.hash}>#</span>
          {children}
        </a>
      </>
    );

    return React.createElement(`h${lvl}`, { className: styles.LinkableHeading, ...otherProps }, link);
  }

  // We shouldn't reach this case because GraphCMS
  // RichText renderes always return a valid element.
  return null;
};

const renderers: NodeRendererType = {
  a: ({ openInNewTab, href, ...rest }) => {
    const target = openInNewTab ? '_blank' : undefined;

    const admonitionCtx = useContext(AdmonitionContext);
    const containsInlineCode = React.Children.toArray(rest.children).some(child => {
      return React.isValidElement(child) && child.props?.content?.some((node: any) => !!node?.code);
    });
    const showAmbientUnderline = !!admonitionCtx || containsInlineCode;

    switch (target) {
      case '_blank':
        return (
          <Linkable ambientUnderline={showAmbientUnderline}>
            {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
            <a href={href} target={target} rel="noopener noreferrer" {...rest} />
          </Linkable>
        );

      default:
        return (
          <Link href={href!} legacyBehavior>
            <Linkable ambientUnderline={showAmbientUnderline}>
              {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
              <a href={href} target={target} {...rest} />
            </Linkable>
          </Link>
        );
    }
  },

  // Linkable headings
  h1: props => <LinkableHeading lvl={1} {...props} />,
  h2: props => <LinkableHeading lvl={2} {...props} />,
  h3: props => <LinkableHeading lvl={3} {...props} />,

  p: props => {
    const { children } = props;

    // Detect text content that denotes a horizontal line ("---" or similar)
    if (React.isValidElement(children)) {
      const textContent = children.props?.content?.[0]?.text;

      if (textContent && typeof textContent === 'string' && /^-+$/.test(textContent.trim())) {
        return <div className={styles.VisualSeparator} />;
      }

      return <p {...props} />;
    }

    // We shouldn't reach this case because GraphCMS
    // RichText renderes always return a valid element.
    return null as any;
  },

  img: props => {
    const { src, width, height, ...otherProps } = props;
    return <Image image={{ handle: src, width, height } as any} {...otherProps} />;
  },

  class: ({ children, className }) => {
    switch (className) {
      case 'admonition:note':
      case 'admonition:info':
        return (
          <Admonition alertType="neutral" admonitionType={className}>
            {children}
          </Admonition>
        );

      case 'admonition:important':
      case 'admonition:caution':
      case 'admonition:warning':
        return (
          <Admonition alertType="warning" admonitionType={className}>
            {children}
          </Admonition>
        );

      case 'admonition:danger':
      case 'admonition:error':
      case 'admonition:restricted availability':
        return (
          <Admonition alertType="error" admonitionType={className}>
            {children}
          </Admonition>
        );

      default:
        return <div className={className}>{children}</div>;
    }
  },

  /**
   * Render custom code blocks with PrismJS highlighting based on data encoded
   * in the block's front-matter.
   */
  code_block: ({ children }) => {
    if (React.isValidElement(children)) {
      const input = children.props?.content?.[0]?.text;
      const { content: code, data } = matter(input);

      // Backward compatibility
      if (typeof data.lang === 'string') {
        data.lang = [data.lang];
      }

      const languagesList: Language[] = [];
      const titlesList: string[] = [];

      if (Array.isArray(data?.lang)) {
        data.lang.forEach(language => {
          const [lang, title] = language.split(';');
          languagesList.push(lang);

          const titleToPush = title || (lang === 'js' ? 'Javascript' : capitalize(lang));
          titlesList.push(titleToPush);
        });
      }

      const langList = codeLanguagesMapper(languagesList);

      return <CodeBlock codes={code} languages={langList} titles={titlesList} />;
    }

    // We shouldn't reach this case because GraphCMS
    // RichText renderers always return a valid element.
    return null as any;
  },
};
