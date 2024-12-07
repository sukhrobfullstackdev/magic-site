'use client';

import React, { useEffect, useState, useRef } from 'react';
import { AnalyticsService } from 'lib/analytics-service';
import { SEO } from 'components/partials/seo';
import Image from 'next/image';
import { clsx } from '@magiclabs/ui';
// import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';
// import { setLazyProp } from 'next/dist/server/api-utils';
import { RiveEmbed } from '../../helpers/RiveEmbed';
import Hero from '../../images/hero.jpg';
// import Logos from '../../images/logos.png';
// import Passport from '../../images/passport.png';
// import Panels from '../../images/panels.png';
// import Newton from '../../images/newton.png';
import Security from '../../images/security.jpg';
import Visual from '../../images/visual.jpg';
// import TrustedBy from '../../images/trustedby.png';
import animPlaceholder1 from '../../images/animplaceholder1.jpg';
// import passportVideoBackground from '../../../../public/images/q4-images/HompageLoop_v01.webm';
import { Investors } from '../investors';
import styles from './home-container.module.less';

const logoWalletconnect = '/images/q4-images/marquee-logos/walletconnect.png';
const logoReown = '/images/q4-images/marquee-logos/reown.png';
const logoHelium = '/images/q4-images/marquee-logos/helium.png';
const logoPolymarket = '/images/q4-images/marquee-logos/polymarket.png';
const logoImmutable = '/images/q4-images/marquee-logos/immutable.png';
const logoNaver = '/images/q4-images/marquee-logos/naver.png';
const logoForbes = '/images/q4-images/marquee-logos/forbes.png';
const logoMoralis = '/images/q4-images/marquee-logos/moralis.png';
const logoTyb = '/images/q4-images/marquee-logos/tyb.png';
const logoShibtoken = '/images/q4-images/marquee-logos/shibtoken.png';

export const HomeContainer: React.FC = () => {
  // const { RiveComponent } = useRive({
  //   src: '/riv/magic_link_passport_panel.riv',
  //   autoplay: true,
  // });

  const [loaded, setLoaded] = useState(false);
  const [signupEmail, setSignupEmail] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const apiUrl = 'https://track.customer.io/api/v1/forms/test_form_1234/submit';
  const authId = 'MTk2OTMyZmVmNTE3ZmYyNjJiNzk6ZjhiZTI4YjA5OTU3NGE1MmE3NTI=';
  // const iconTwitter = '/img/icons/twitter_ico.png';

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!loaded) {
      AnalyticsService.TrackPage('Landing - Home');
      if (videoRef) {
        videoRef.current?.play();
      }
      setLoaded(true);
    }
  }, [loaded, videoRef]);

  const [isMobileWidth, setIsMobileWidth] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsMobileWidth(true);
    }
  }, []);

  // useEffect(() => {
  //   if (videoRef && videoRef.current) {
  //     videoRef.current.play();
  //   }
  // }, [videoRef]);

  const handleSignup = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await postData(signupEmail);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  async function postData(email: string) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(email)) {
      setInvalidEmail(false);
      try {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
        if (!response.ok) {
          setInvalidEmail(true);
          const errorData = await response.json();
          throw new Error(`Error: ${errorData.message}`);
        } else if (response.status === 200) {
          setInvalidEmail(false);
          setFormSuccess(true);
        }
      } catch (error) {
        console.error('Error submitting data:', error);
      }
    } else {
      setInvalidEmail(true);
    }
  }

  return (
    <div
      className={clsx(styles.pageContainer)}
      style={{
        background: '#19191a',
        marginTop: -95,
        paddingTop: 90,
      }}
    >
      <div className="flex flex-col items-center bg-[#19191A]">
        <div>
          <SEO
            title="Magic Labs | The best way to build onchain"
            description="We've onboarded 40 million people to the world's leading apps. We're trusted by over 190,000 developers. We're Magic."
            image="/images/og-img.png"
          />
        </div>

        <div className="py-0 mx-auto mb-0" style={{ maxWidth: 1040 }}>
          <Image
            src={Hero}
            width={793}
            height={300}
            priority
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}
            alt=""
          />
        </div>

        <div className={clsx(styles.heroIntro, 'text-center px-2 px-md-0')}>
          <p className={clsx(styles.gradientText, styles.GTSuperHeroHeadline)}>
            The best way to{' '}
            <span className="d-inline d-md-none">
              <br />
            </span>
            build onchain
          </p>
          <p className={clsx('mb-4')}>
            Build with the pioneers of wallet abstraction. <br />
            Embedded wallets. API wallets. <strong> And now Passport.</strong>
          </p>
          <a href="https://dashboard.magic.link/signup">
            <button className={clsx(styles.buttonWhite)}>Start now</button>
          </a>
        </div>

        <div
          id="logos"
          className={clsx(styles.marqueeContainer, 'mt-5 py-2 py-md-5 ')}
          style={{
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden',
          }}
        >
          <div className={clsx(styles.logosShadow, styles.logosShadowLeft)} />
          <div className={clsx(styles.logosShadow, styles.logosShadowRight)} />

          <div className={clsx(styles.logos, ' d-flex justify-content-around')}>
            <div className={clsx(styles.logo, ' px-2 px-md-3 px-lg-4')}>
              <Image
                src={logoPolymarket}
                alt="Polymarket"
                width={135}
                height={32}
                className={clsx('w-100 h-auto')}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
            <div className={clsx(styles.logo, ' px-2 px-md-3 px-lg-4')}>
              <Image
                src={logoHelium}
                alt="Helium"
                width={111}
                height={36}
                className={clsx('w-100 h-auto')}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
            <div className={clsx(styles.logo, ' px-2 px-md-3 px-lg-4')}>
              <Image
                src={logoNaver}
                alt="Naver"
                width={121}
                height={32}
                className={clsx('w-100 h-auto')}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
            <div className={clsx(styles.logo, ' px-2 px-md-3 px-lg-4')}>
              <Image
                src={logoImmutable}
                alt="Immutable"
                width={150}
                height={38}
                className={clsx('w-100 h-auto')}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
            <div className={clsx(styles.logo, ' px-2 px-md-3 px-lg-4')}>
              <Image
                src={logoForbes}
                alt="Forbes"
                width={113}
                height={48}
                className={clsx('w-100 h-auto')}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
            <div className={clsx(styles.logo, ' px-2 px-md-3 px-lg-4')}>
              <Image
                src={logoShibtoken}
                alt="Shibtoken"
                width={40}
                height={40}
                className={clsx('w-100 h-auto')}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
            <div className={clsx(styles.logo, ' px-2 px-md-3 px-lg-4')}>
              <Image
                src={logoWalletconnect}
                alt="WalletConnect"
                width={200}
                height={36}
                className={clsx('w-100 h-auto')}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
            <div className={clsx(styles.logo, ' px-2 px-md-3 px-lg-4')}>
              <Image
                src={logoReown}
                alt="Reown"
                width={120}
                height={32}
                className={clsx('w-100 h-auto')}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
            <div className={clsx(styles.logo, ' px-2 px-md-3 px-lg-4')}>
              <Image
                src={logoTyb}
                alt="TYB"
                width={70}
                height={48}
                className={clsx('w-100 h-auto')}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
            <div className={clsx(styles.logo, ' px-2 px-md-3 px-lg-4')}>
              <Image
                src={logoMoralis}
                alt="Moralis"
                width={129}
                height={30}
                className={clsx('w-100 h-auto')}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
            <div className={clsx(styles.logo, ' px-2 px-md-3 px-lg-4')}>
              <Image
                src={logoPolymarket}
                alt="Polymarket"
                width={135}
                height={32}
                className={clsx('w-100 h-auto')}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
            <div className={clsx(styles.logo, ' px-2 px-md-3 px-lg-4')}>
              <Image
                src={logoHelium}
                alt="Helium"
                width={111}
                height={36}
                className={clsx('w-100 h-auto')}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
            <div className={clsx(styles.logo, ' px-2 px-md-3 px-lg-4')}>
              <Image
                src={logoNaver}
                alt="Naver"
                width={121}
                height={32}
                className={clsx('w-100 h-auto')}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
            <div className={clsx(styles.logo, ' px-2 px-md-3 px-lg-4')}>
              <Image
                src={logoImmutable}
                alt="Immutable"
                width={150}
                height={38}
                className={clsx('w-100 h-auto')}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
            <div className={clsx(styles.logo, ' px-2 px-md-3 px-lg-4')}>
              <Image
                src={logoForbes}
                alt="Forbes"
                width={110}
                height={48}
                className={clsx('w-100 h-auto')}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
            <div className={clsx(styles.logo, ' px-2 px-md-3 px-lg-4')}>
              <Image
                src={logoShibtoken}
                alt="Shibtoken"
                width={40}
                height={40}
                className={clsx('w-100 h-auto')}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
            <div className={clsx(styles.logo, ' px-2 px-md-3 px-lg-4')}>
              <Image
                src={logoWalletconnect}
                alt="WalletConnect"
                width={200}
                height={36}
                className={clsx('w-100 h-auto')}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
            <div className={clsx(styles.logo, ' px-2 px-md-3 px-lg-4')}>
              <Image
                src={logoReown}
                alt="Reown"
                width={120}
                height={32}
                className={clsx('w-100 h-auto')}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
            <div className={clsx(styles.logo, ' px-2 px-md-3 px-lg-4')}>
              <Image
                src={logoTyb}
                alt="TYB"
                width={70}
                height={48}
                className={clsx('w-100 h-auto')}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
            <div className={clsx(styles.logo, ' px-2 px-md-3 px-lg-4')}>
              <Image
                src={logoMoralis}
                alt="Moralis"
                width={129}
                height={30}
                className={clsx('w-100 h-auto')}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
          </div>
        </div>

        <div className={clsx(styles.sectionWrapper, styles.passportAnimContainer, 'text-center pt-5')}>
          <div className="">
            <div className="">
              <div
                style={{
                  position: 'relative',
                  zIndex: 0,
                }}
                className="mb-5 mt-0 mt-md-5"
              >
                <div className="d-block d-md-none">
                  <p className={clsx(styles.gradientText, styles.JetBrainsHeadline, 'mb-2')}>
                    FASTER. SIMPLER. SMARTER.
                  </p>
                  <h1
                    className={clsx(styles.gradientTextToBlack, styles.GTSuperHeadline, styles.giantHeadline)}
                    style={{
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    Passport
                  </h1>
                </div>

                <RiveEmbed isMobileWidth={isMobileWidth} />

                <a href="/" id="passport" style={{ opacity: 0 }}>
                  Passport
                </a>
              </div>

              <h3 className={clsx(styles.gradientText, styles.GTSuperHeadline, '')}>
                Smarter than a{' '}
                <span className="d-inline d-md-none">
                  <br />
                </span>
                smart wallet
              </h3>

              <div className="">
                <p className={clsx('mt-4')}>
                  Passport removes the barriers between wallets and chains.{' '}
                  <span className="d-none d-md-inline">
                    <br />
                  </span>
                  It's the first chain abstracted smart wallet.
                </p>
                <p className={clsx('my-4')}>Be one of the first to use Passport.</p>

                <div className={clsx(styles.signupForm, 'w-100 flex flex-col items-center')}>
                  <div className={clsx('d-flex flex-row align-items-stretch justify-content-center')}>
                    <div className="">
                      <div className={clsx(styles.pillContainer)}>
                        <form onSubmit={handleSignup} className={clsx('d-flex')}>
                          <input
                            className={clsx('emailSignUpInput ')}
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Join the waitlist"
                            value={signupEmail}
                            onChange={e => setSignupEmail(e.target.value)}
                            required
                            style={{
                              backgroundColor: 'transparent',
                              opacity: formSuccess ? 0 : 1,
                              pointerEvents: formSuccess ? 'none' : 'all',
                            }}
                          />
                          <div
                            className={clsx('ps-2 ')}
                            style={{
                              opacity: formSuccess ? 0 : 1,
                              pointerEvents: formSuccess ? 'none' : 'all',
                            }}
                          >
                            <button type="submit">
                              <div className={clsx(styles.buttonIcon)} />
                            </button>
                          </div>
                          {formSuccess ? (
                            <div
                              className={clsx(
                                styles.formSuccessThankYou,
                                ' d-flex align-items-center justify-content-center ',
                              )}
                              style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: 0,
                                paddingRight: formSuccess ? 27 : 0,
                              }}
                            >
                              You’re on the list
                            </div>
                          ) : null}
                        </form>
                      </div>
                    </div>
                  </div>
                  {invalidEmail ? (
                    <div className={clsx(styles.lineHeader, 'flex justify-center items-center mt-3')}>
                      <div className={clsx(styles.trustedLine, styles.trustedLineLeft)} />
                      <div className={clsx('px-2')}>Try Again</div>
                      <div className={clsx(styles.trustedLine, styles.trustedLineRight)} />
                    </div>
                  ) : null}
                  <div className={clsx(styles.formDisclaimer, 'mt-3 text-center')}>
                    By signing up, you agree to receive marketing-related communications from us about Magic Labs and
                    acknowledge that you have read and agree to our{' '}
                    <a href="https://magic.link/legal/privacy-policy" target="blank" rel="noopener noreferrer">
                      Privacy Policy
                    </a>
                    .
                  </div>
                </div>
              </div>

              <div className="my-5 pt-3 d-flex row gx-5 align-items-stretch">
                <div className={clsx(styles.calloutColumnContainer, 'col-12 col-md-4 mb-4 mb-md-0')}>
                  <div className={clsx(styles.calloutColumn)}>
                    <div className={clsx(styles.calloutColumnTop)}>
                      <iframe
                        title="Get started quickly"
                        style={{ border: 'none' }}
                        width="500"
                        height="320"
                        src="https://rive.app/s/PAJyKVA3RkyfRGEDNhuDeg/embed"
                        allowFullScreen
                        allow="autoplay"
                      />
                      <Image
                        className={clsx(styles.calloutColumnTopPlaceholder)}
                        src={animPlaceholder1}
                        width={500}
                        height={320}
                        priority
                        sizes="100vw"
                        style={{
                          width: '100%',
                          height: 'auto',
                        }}
                        alt=""
                      />
                      <div className={clsx(styles.calloutColumnTopShadow)} />
                    </div>
                    <div className={clsx(styles.calloutColumnBottom)}>
                      <h3>Get started quickly</h3>
                      <p>In minutes, install Passport and easily integrate the SDK into your existing code</p>
                    </div>
                  </div>
                </div>
                <div className={clsx(styles.calloutColumnContainer, 'col-12 col-md-4 mb-4 mb-md-0')}>
                  <div className={clsx(styles.calloutColumn)}>
                    <div className={clsx(styles.calloutColumnTop)}>
                      <iframe
                        title="Build across chains"
                        style={{ border: 'none' }}
                        width="500"
                        height="320"
                        src="https://rive.app/s/FU_yya2dIEW7xkxtOVwsDg/embed"
                        allowFullScreen
                        allow="autoplay"
                      />
                      <Image
                        className={clsx(styles.calloutColumnTopPlaceholder)}
                        src={animPlaceholder1}
                        width={500}
                        height={320}
                        priority
                        sizes="100vw"
                        style={{
                          width: '100%',
                          height: 'auto',
                        }}
                        alt=""
                      />
                      <div className={clsx(styles.calloutColumnTopShadow)} />
                    </div>
                    <div className={clsx(styles.calloutColumnBottom)}>
                      <h3>Build across chains</h3>
                      <p>Get access to fast, cross-chain user liquidity with just one deployment in your app</p>
                    </div>
                  </div>
                </div>
                <div className={clsx(styles.calloutColumnContainer, 'col-12 col-md-4 mb-4 mb-md-0')}>
                  <div className={clsx(styles.calloutColumn)}>
                    <div className={clsx(styles.calloutColumnTop)}>
                      <iframe
                        title="Attract more users"
                        style={{ border: 'none' }}
                        width="500"
                        height="320"
                        src="https://rive.app/s/ef51xOrhekyKNlybgsRZDA/embed"
                        allowFullScreen
                        allow="autoplay"
                      />
                      <Image
                        className={clsx(styles.calloutColumnTopPlaceholder)}
                        src={animPlaceholder1}
                        width={500}
                        height={320}
                        priority
                        sizes="100vw"
                        style={{
                          width: '100%',
                          height: 'auto',
                        }}
                        alt=""
                      />
                      <div className={clsx(styles.calloutColumnTopShadow)} />
                    </div>
                    <div className={clsx(styles.calloutColumnBottom)}>
                      <h3>Attract more users</h3>
                      <p>
                        Instantly take your users from intention to action with Passport's chain-abstracted experience
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={clsx(styles.passportNewtonContainer)}>
                <div className={clsx(styles.passportNewtonContainerBackground)}>
                  {/* {isMobileWidth ? ( */}
                  {/*  <div className={clsx('d-block')}> */}
                  {/*    <Image */}
                  {/*      src="/images/q4-images/loopPosterDesktop.jpg" */}
                  {/*      width={1920} */}
                  {/*      height={1080} */}
                  {/*      layout="responsive" */}
                  {/*      priority */}
                  {/*    /> */}
                  {/*  </div> */}
                  {/* ) : ( */}
                  {/*  <video */}
                  {/*    className={clsx('d-block')} */}
                  {/*    ref={videoRef} */}
                  {/*    controls={false} */}
                  {/*    autoPlay={false} */}
                  {/*    loop */}
                  {/*    muted */}
                  {/*    playsInline */}
                  {/*  > */}
                  {/*    <source src="/images/q4-images/HomepageLoop_v02.webm" /> */}
                  {/*    Your browser does not support the video tag. */}
                  {/*  </video> */}
                  {/*  // <div */}
                  {/*  //   style={{ */}
                  {/*  //     padding: '56.25% 0 0 0', */}
                  {/*  //     position: 'relative', */}
                  {/*  //   }} */}
                  {/*  // > */}
                  {/*  //   <iframe */}
                  {/*  //     src="https://player.vimeo.com/video/1027334777?badge=0&autoplay=1&loop=1&autopause=0&player_id=0&title=0&byline=0&portrait=0&sidedock=0&app_id=58479" */}
                  {/*  //     allow="autoplay; fullscreen; picture-in-picture; clipboard-write" */}
                  {/*  //     style={{ */}
                  {/*  //       position: 'absolute', */}
                  {/*  //       top: 0, */}
                  {/*  //       left: 0, */}
                  {/*  //       width: '100%', */}
                  {/*  //       height: '100%', */}
                  {/*  //     }} */}
                  {/*  //     title="Magic" */}
                  {/*  //   /> */}
                  {/*  // </div> */}
                  {/* )} */}
                  <video
                    className={clsx('d-block')}
                    ref={videoRef}
                    controls={false}
                    autoPlay={false}
                    loop
                    muted
                    playsInline
                  >
                    <source src="/images/q4-images/HomepageLoop_v02.webm" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                <div className={clsx(styles.passportNewtonContainerOverlay)}>
                  <div>
                    <h3 className={clsx(styles.gradientText, styles.GTSuperHeadline)}>
                      Passport,
                      <br />
                      meet Newton
                    </h3>
                    <p className={clsx('mb-4')}>
                      When you build with Passport on the Newton chain, you access the benefits of the first chain
                      unification network. Newton unifies the fragmented world of web3. Imagine one wallet, one balance,
                      one chain. Build once. Be everywhere.
                    </p>
                    <a href="https://magicnewton.com" target="_blank" rel="noopener noreferrer">
                      <button className={clsx(styles.buttonWhite)}>magicnewton.com</button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={clsx(styles.sectionWrapper, 'd-flex p-0 flex-column flex-md-row ')}
          style={{ overflow: 'hidden' }}
        >
          <div
            className={clsx(
              styles.securityContainer,
              'col-12 col-md-6 d-flex align-items-center justify-content-start',
            )}
          >
            <div>
              <h3 className={clsx(styles.gradientText, styles.GTSuperHeadline)}>
                We set the security <br />
                standards onchain
              </h3>
              <p>Magic leads the industry with secure scalability and performance. </p>
              <br />
              <p> Compliance and business continuity ensured by SOC 2 Type II, CCPA, GDPR, HIPAA, and ISO.</p>
            </div>
          </div>
          <div className={clsx('col-12 col-md-6')}>
            <Image
              src={Security}
              width={3488}
              height={2656}
              priority
              sizes="100vw"
              style={{
                width: '100%',
                height: 'auto',
              }}
              alt=""
            />
          </div>
        </div>

        <div className={clsx(styles.visionContainer, 'd-flex align-items-center justify-content-center')}>
          <div className={clsx(styles.visionContainerBackground)} style={{ backgroundImage: 'url(' + Visual + ')' }} />

          <div className={clsx(styles.visionContainerContent)}>
            <h3 className={clsx(styles.gradientText, styles.GTSuperHeadline, 'mb-4')}>
              The vision of{' '}
              <span className="d-inline d-md-none">
                <br />
              </span>
              Magic Labs
            </h3>
            <p>
              Magic started in 2018 with a vision to simplify wallets, which at the time were the worst part of going
              onchain. Users loved our product. Some in the industry said it wouldn't succeed. They were wrong. We
              invented a multi-billion dollar category.
            </p>
            <p>
              Now we're taking on the worst part of going onchain today. We know that developers don't need more siloed
              chains. They need better tools to build across chains and user-friendly products that help them to onboard
              everyone. Once again, Magic leads the way.
            </p>
            <p>
              Magic abstracts away complexity and innovates with simplicity. We stand for everyone who joins our effort
              to build a simpler, better world onchain.
            </p>
          </div>
        </div>
        <Investors />
        <div style={{ padding: '120px 0' }}>
          <h3 className={clsx(styles.gradientText, styles.GTSuperHeadline, 'text-center')}>
            Start building{' '}
            <span className="d-inline d-md-none">
              <br />
            </span>
            with Magic
          </h3>
          <div className={clsx(styles.startButtonsContainer, 'text-center mb-5')}>
            <a href="https://dashboard.magic.link/signup">
              <button className={clsx(styles.buttonWhite, 'mb-3 mb-md-0')}>Start now</button>
            </a>
            <span className="d-inline d-md-none">
              <br />
            </span>
            <a href="/#passport">
              <button className={clsx(styles.buttonGrey, 'ms-0 ms-md-3')}>Sign up for Passport</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
