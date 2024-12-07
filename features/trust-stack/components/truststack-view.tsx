import React, { useCallback, useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Flex, clsx, Spacer } from '@magiclabs/ui';
// import { AnalyticsService } from 'lib/analytics-service';
import { SectionWrapper } from 'components/layout/section-wrapper';

import Image from 'next/image';
import imgLogo from 'public/images/truststack/magiclogo.png';
import Spline from '@splinetool/react-spline';
import styles from './truststack-view.module.less';
import { SEO } from '../../../components/partials/seo';
import { AnalyticsService } from '../../../lib/analytics-service';

export const TrustStackView: React.FC = () => {
  const router = useRouter();

  const vendorsRef = useRef<any>();
  const valuationRef = useRef<any>();
  const tleIntervalRef = useRef<any>();

  const [probabilityPerVendor, setProbabilityPerVendor] = useState<any | null>(null);
  const [probability, setProbability] = useState<any | null>(null);
  const [annualRisk1, setAnnualRisk1] = useState<any | null>(null);
  const [annualRisk2, setAnnualRisk2] = useState<any | null>(null);
  const [valuation, setValuation] = useState<any | null>(null);
  const [loaded, setLoaded] = useState<boolean | null>(false);

  const impact1 = 0.05;
  const impact2 = 0.15;

  useEffect(() => {
    // AnalyticsService.TrackPage('Contact Magic');
    handleChange();
    setLoaded(true);
  }, []);

  const handleChange = () => {
    setValuation(valuationRef.current?.value.replace(/,/gi, ''));
    const perVendor = 1 / tleIntervalRef.current?.value;
    const prob =
      Math.log(parseInt(vendorsRef.current?.value, 10) + 1) / Math.LN10 / (Math.log(2) / Math.LN10 / perVendor);
    setProbabilityPerVendor((perVendor * 100).toFixed());
    setProbability((prob * 100).toFixed());
    const risk1 = Math.round(prob * impact1 * valuationRef.current?.value.replace(/,/gi, ''));
    const risk2 = Math.round(prob * impact2 * valuationRef.current?.value.replace(/,/gi, ''));
    setAnnualRisk1(risk1.toLocaleString());
    setAnnualRisk2(risk2.toLocaleString());
  };

  return (
    <>
      <SEO title="Trust Loss Estimator | Magic" description="Trust Loss Estimator" image="/images/magic-og.png" />
      <Head>
        <style>{`html, body { background-color: #140937 !important; } nav { opacity:0!important; pointer-events:none!important } .footer {position:relative;z-index:1} .footer > div:first-of-type {display:none!important; `}</style>
      </Head>
      <Flex.Column className={clsx(styles.viewContainer, 'trustStackContainer')} horizontal="center">
        <SectionWrapper className={clsx(styles.SectionWrapper)}>
          <div className={clsx('d-flex align-items-center flex-column flex-md-row')}>
            <div
              className={clsx('col-12 col-md-6 pb-5 pb-md-0 ps-2 ps-md-0 pe-2 pe-md-5 mb-3 mb-md-0')}
              style={{ textAlign: 'left', color: 'white' }}
            >
              <div>
                <div className={clsx('mb-3')}>
                  <Image
                    alt=""
                    src={imgLogo}
                    width={111}
                    height={40}
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                    }}
                  />
                </div>
                <h1>How much of your brand equity is potentially at risk?</h1>
                <p className={clsx('pt-4 pb-3')}>Use the Trust Loss Estimator to find out.</p>
                <div className={clsx('d-flex justify-content-start py-1')}>
                  <a
                    onClick={useCallback(
                      () => AnalyticsService.TrackAction('Hero Section Start Now Button Clicked'),
                      [],
                    )}
                    href="https://magic.link/blog"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={clsx('btnGlass btnLightText')}
                  >
                    Learn More
                  </a>
                  <Spacer size={16} />
                  <a
                    onClick={useCallback(
                      () => AnalyticsService.TrackAction('Hero Section Book a Demo button Clicked'),
                      [],
                    )}
                    href="https://magic.link/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={clsx('btnGlass btnLightText btnPurple')}
                  >
                    Contact Sales
                  </a>
                </div>
              </div>
            </div>
            <div className={clsx('co-12 col-md-6 d-flex justify-content-start justify-content-md-center')}>
              <form className={styles.formWrapper} style={{ maxWidth: 400 }}>
                <div className={clsx(styles.formTop)}>
                  <div className={clsx('mb-3 textCentered')}>
                    <h4>TRUST LOSS ESTIMATOR</h4>
                  </div>
                  <div className={clsx('mb-3')}>
                    <div className={clsx('')}>
                      <p>Approximately how many 3rd party vendors do you use?</p>
                    </div>
                    <div className={clsx('')}>
                      <input
                        ref={vendorsRef}
                        onChange={handleChange}
                        id="vendorsInput"
                        name="vendors"
                        type="text"
                        defaultValue="15"
                      />
                    </div>
                  </div>
                  <div className={clsx(' mb-3')}>
                    <div className={clsx('')}>
                      <p>What is the current value of your company?</p>
                    </div>
                    <div className={clsx('position-relative')}>
                      <input
                        ref={valuationRef}
                        value={valuation?.split(/(?=(?:\d{3})+$)/).join(',')}
                        onChange={handleChange}
                        id="valuationInput"
                        name="valuation"
                        type="text"
                        defaultValue="100,000,000"
                        className={clsx(styles.hasSymbol)}
                      />
                      <span className={clsx(styles.fieldPrepend, styles.fieldSymbol, 'digital7')}>$</span>
                    </div>
                  </div>
                  <div className={clsx(' mb-3')}>
                    <div className={clsx('')}>
                      <p>How many years do you think it will be before any vendor has a security issue?</p>
                    </div>
                    <div className={clsx('position-relative')}>
                      <input
                        ref={tleIntervalRef}
                        onChange={handleChange}
                        id="tleIntervalInput"
                        name="tleInterval"
                        type="text"
                        defaultValue="4"
                      />{' '}
                      <span className={clsx(styles.fieldAppend, styles.fieldSymbol, 'digital7')}>YEARS</span>
                    </div>
                  </div>
                </div>
                <div className={clsx(styles.formBottom, 'digital7')}>
                  <div className={clsx(styles.formBottomHeadline, ' mb-3')}>Range of Impact to Valuation</div>
                  <div className={clsx(styles.formBottomLabels, 'row mb-3')}>
                    <div className={clsx('col-6 textBold')}>{impact1 * 100}%</div>
                    <div className={clsx('col-6 textBold')}>{impact2 * 100}%</div>
                  </div>
                  <div className={clsx(styles.formBottomNumbers, 'row mb-3 textBold')}>
                    <div className={clsx('col-6 ')}>${annualRisk1}</div>
                    <div className={clsx('col-6 ')}>${annualRisk2}</div>
                  </div>
                </div>
                <div className={clsx(styles.grain)} />
              </form>
            </div>
          </div>
        </SectionWrapper>
      </Flex.Column>
      <div className={clsx(styles.splineBackground)}>
        {loaded ? (
          <iframe
            title="background"
            className={clsx(styles.spline)}
            src="https://my.spline.design/benchmarkbg-c7b023543ed13aefd38fb391fab2cbd2/"
            frameBorder="0"
            width="100%"
            height="100%"
          />
        ) : null}
      </div>
    </>
  );
};
