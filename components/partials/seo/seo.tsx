import React, { useMemo } from 'react';
import Head from 'next/head';
import { Maybe } from 'graphql/generated';
import { ensureArray } from 'lib/array-helpers';
import { useRouter } from 'next/router';
import { cleanURL } from 'lib/url-helpers';

type OGVisualAsset =
  | Maybe<string>
  | {
      src?: Maybe<string>;
      secureSrc?: Maybe<string>;
      type?: Maybe<string>;
      width?: Maybe<number>;
      height?: Maybe<number>;
      alt?: Maybe<string>;
    };

type OGAudioAsset =
  | Maybe<string>
  | {
      src?: Maybe<string>;
      secureSrc?: Maybe<string>;
      type?: Maybe<string>;
    };

interface SEOProps {
  title?: Maybe<string>;
  type?: Maybe<string>;
  description?: Maybe<string>;
  image?: OGVisualAsset | OGVisualAsset[];
  video?: OGVisualAsset | OGVisualAsset[];
  audio?: OGAudioAsset | OGAudioAsset[];
  keywords?: Maybe<string[]>;
  disableSEO?: boolean;
  slug?: Maybe<string>;
}

export const INITIAL_SEO_DESCRIPTION =
  'Bring your Web3 strategy to life with Magic. Passwordless Auth + NFT wallet onboarding (without seed phrase) for your customers.';

export const SEO: React.FC<SEOProps> = props => {
  const { title, type, description, keywords, image, video, audio, slug, disableSEO } = props;

  const router = useRouter();

  const canonicalURL = useMemo(() => {
    const url = slug ? new URL(slug, `https://magic.link/`).href : new URL(router.asPath, `https://magic.link/`).href;
    return cleanURL(url);
  }, [slug, router.asPath]);

  const keywordsResolved = useMemo(() => keywords?.join(','), [keywords]);

  return (
    <Head>
      {title && <title>{title} | Magic</title>}
      {description && <meta name="description" content={description} />}
      {keywordsResolved && <meta property="keywords" content={keywordsResolved} />}
      {disableSEO && <meta name="robots" content="noindex, nofollow" />}
      {/* Open Graph Meta */}
      <meta property="og:site_name" content="Magic" />
      <meta property="og:type" content={type ?? 'website'} />

      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {canonicalURL && <meta property="og:url" content={canonicalURL} />}

      {/* Open Graph A/V assets */}

      {ensureArray(image).map(data =>
        data || (data as any)?.src ? (
          <OGAsset key={typeof data === 'string' ? data : (data as any)?.src} data={data} property="image" />
        ) : null,
      )}

      {ensureArray(video).map(data =>
        data || (data as any)?.src ? (
          <OGAsset key={typeof data === 'string' ? data : (data as any)?.src} data={data} property="video" />
        ) : null,
      )}

      {ensureArray(audio).map(data =>
        data || (data as any)?.src ? (
          <OGAsset key={typeof data === 'string' ? data : (data as any)?.src} data={data} property="audio" />
        ) : null,
      )}

      {/* Twitter Meta */}

      <meta name="twitter:card" content="photo" />
      <meta name="twitter:site" content="@magic_labs" />
      <meta name="twitter:creator" content="@magic_labs" />
    </Head>
  );
};

type OGVisualProps =
  | {
      data: OGVisualAsset;
      property: 'image' | 'video';
    }
  | {
      data: OGAudioAsset;
      property: 'audio';
    };

const OGAsset: React.FC<OGVisualProps> = props => {
  const { data, property } = props;

  const rawSrc = typeof data === 'string' ? data : data?.src;
  const srcResolved = useMemo(() => {
    return rawSrc?.startsWith('/') ? new URL(rawSrc, `https://magic.link/`).href : rawSrc ?? undefined;
  }, [rawSrc]);

  if (typeof data === 'string') {
    return <meta property={`og:${property}`} content={srcResolved} />;
  }

  if (data?.src) {
    return (
      <>
        <meta property={`og:${property}`} content={srcResolved} />
        {data.secureSrc && <meta property={`og:${property}:secure_url`} content={data.secureSrc} />}
        {data.type && <meta property={`og:${property}:type`} content={data.type} />}
        {(data as any).width && <meta property={`og:${property}:width`} content={(data as any).width.toString()} />}
        {(data as any).height && <meta property={`og:${property}:height`} content={(data as any).height.toString()} />}
        {(data as any).alt && <meta property={`og:${property}:alt`} content={(data as any).alt} />}
      </>
    );
  }

  return null;
};
