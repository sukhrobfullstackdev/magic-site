import React, { useEffect, useCallback } from 'react';
import Head from 'next/head';
import { Flex, Spacer, clsx, Linkable, CallToAction, HoverActivatedTooltip, useToast } from '@magiclabs/ui';
import { useClipboard } from 'usable-react';
import { AnalyticsService } from 'lib/analytics-service';
import Image from 'next/image';
import imgBrand1 from 'public/brand-assets/colored-logo.png';
import imgBrand2 from 'public/brand-assets/black-white-logo.png';
import imgBrand3 from 'public/brand-assets/icons.png';
import imgBrand4 from 'public/brand-assets/circles.svg';

import styles from './brand-assets-view.module.less';

export const BrandAssetsView: React.FC = () => {
  useEffect(() => {
    AnalyticsService.TrackPage('Landing - Brand Assets');
  }, []);

  return (
    <>
      <Head>
        <title>Brand Assets and Guidelines | Magic</title>
        <meta name="description" content="Download Magic's logos and icons for allowed use cases." />
      </Head>
      <Flex.Column className={styles.BrandAssets}>
        <Spacer size={35} orientation="vertical" />
        <h1>Brand Assets</h1>
        <Spacer size={50} orientation="vertical" />

        <Flex.Row horizontal="space-between" wrap>
          <div className={clsx(styles.section, styles.leftBasis)}>
            <h2>Our logo</h2>

            {/* Icons + wordmarks */}
            <h3>Icon + Wordmark</h3>
            <div className={styles.imageContainer}>
              <Image
                src={imgBrand1}
                alt="Full Logos"
                className={clsx(styles.uxImg)}
                width={660}
                height={533}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  objectPosition: 'center center',
                }}
              />
              <Image
                src={imgBrand2}
                alt="Full Logos"
                className={clsx(styles.uxImg)}
                width={660}
                height={533}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  objectPosition: 'center center',
                }}
              />
            </div>

            {/* Icons */}
            <h3>Icon Only</h3>
            <div className={styles.imageContainer}>
              <Image
                src={imgBrand3}
                alt="Icon Only"
                className={clsx(styles.uxImg)}
                width={660}
                height={184}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  objectPosition: 'center center',
                }}
              />
            </div>

            {/* Logo background */}
            <h3>Background</h3>
            <p>Our icon was made using numbers divisible by 9 (our lucky number) and circles.</p>
            <div className={styles.imageContainer}>
              <Image
                src={imgBrand4}
                alt="Magic Icon Breakdown"
                className={clsx(styles.uxImg)}
                width={660}
                height={622}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  objectPosition: 'center center',
                }}
              />
            </div>

            {/* Color swatches */}
            <h2>Our Colors</h2>
            <div className={styles.brandColors}>
              <BrandColorSwatch color="primary" />
              <BrandColorSwatch color="dark" />
              <BrandColorSwatch color="light" />
            </div>
          </div>

          <div className={clsx(styles.section, styles.rightBasis)}>
            <h2>Guidelines</h2>

            {/* Do items */}
            <h3 className={styles.do}>Dos</h3>
            <ul>
              <li>Use enough space around the logo.</li>
              <li>Use the vector version (.svg) if possible.</li>
            </ul>

            {/* Don't items */}
            <h3 className={styles.dont}>Don'ts</h3>
            <ul>
              <li>Edit the original files.</li>
              <li>Use parts of these files for your own company's or product's use.</li>
              <li>
                Use these logos to imply a partnership or endorsement by Magic Labs, Inc. without formal approval.
              </li>
            </ul>

            {/* Contact info & download link */}
            <h3>Questions?</h3>
            <p>
              Contact&nbsp;
              <Linkable>
                <a href="mailto:hello@magic.link">hello@magic.link</a>
              </Linkable>
            </p>
            <div>
              <CallToAction.a href="/brand-assets/magic-logos.zip">Download Logos</CallToAction.a>
            </div>
          </div>
        </Flex.Row>
      </Flex.Column>
    </>
  );
};

const brandColors = {
  primary: '#6851FF',
  secondary: '#00C988',
  dark: '#000000',
  light: '#FFFFFF',
};

function BrandColorSwatch(props) {
  const { color } = props;

  const { createToast } = useToast();
  const { copy } = useClipboard();

  const onCopyRequest = useCallback(async () => {
    try {
      await copy(brandColors[color]);
      createToast({ type: 'success', message: 'Copied to clipboard!' });
    } catch {
      createToast({ type: 'error', message: 'Failed to copy to clipboard.' });
    }
  }, [color, copy, createToast]);

  return (
    <HoverActivatedTooltip className={styles.swatchContainer} placement="top" portalize>
      <HoverActivatedTooltip.Anchor>
        <button className={clsx(styles.swatch, styles[color])} onClick={onCopyRequest} aria-label="click to copy">
          {brandColors[color]}
        </button>
      </HoverActivatedTooltip.Anchor>

      <HoverActivatedTooltip.Content aria-hidden="true">Click to copy!</HoverActivatedTooltip.Content>
    </HoverActivatedTooltip>
  );
}
