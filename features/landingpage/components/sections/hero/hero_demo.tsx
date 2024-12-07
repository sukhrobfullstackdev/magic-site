import React, { useState, useEffect, useRef } from 'react';
import { clsx, CallToAction } from '@magiclabs/ui';
import { AnalyticsService } from 'lib/analytics-service';
import { Magic } from 'magic-sdk';
import { ethers } from 'ethers';
import ReactRecaptcha3 from 'react-google-recaptcha3';
import Image from 'next/image';

import heroDemoLogoImage from 'public/images/landingpage/hero/nftimage.png';
import demoProgressSpinnerImage from 'public/images/landingpage/hero/spinner.svg';
import styles from './hero_demo.module.less';

const IS_NFT_MINTING_AVAILABLE = true;
const RECAPTCHA_SITE_KEY = '6LcH8VwmAAAAAOqYsdmtOF2XqDqAnvSBu5cq6PKy';

export const IS_CLIENT = typeof window !== 'undefined';
export const getMagicInstance = () => {
  let magicInstance;
  if (!IS_CLIENT) return;
  if (!magicInstance) {
    magicInstance = new Magic('pk_live_85A288CFBB959322', {
      network: polygonNodeOptions,
    });
  }
  return magicInstance;
};

export const getProviderInstance = () => {
  let providerInstance;
  if (!IS_CLIENT) return null;
  if (!providerInstance) {
    providerInstance = new ethers.providers.Web3Provider(getMagicInstance()?.rpcProvider as any);
  }
  return providerInstance;
};

const polygonNodeOptions = {
  rpcUrl: 'https://polygon-rpc.com/', // Polygon RPC URL
  chainId: 137, // Polygon chain id
};

const THRESHOLD = -3;

export const HeroDemo = () => {
  const [address, setAddress] = useState(null);
  const [mintStatus, setMintStatus] = useState<string>('');
  const [transactionStatus, setTransactionStatus] = useState<string>('Starting transaction...');
  const [mintFired, setMintFired] = useState(false);
  const [mintDone, setMintDone] = useState(false);
  const [requestId, setRequestId] = useState('');
  const [isMintingStarted, setIsMintingStarted] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userStateDetermined, setUserStateDetermined] = useState(false);
  const [portalsNftUnavailable, setPortalsNftUnavailable] = useState(false);

  const card = useRef(null);
  let statusPollingInterval;

  const onMintingStarted = async () => {
    const status_resp = await fetch('https://nft-api.magic.link/v1/nft/request/status?request_id=' + requestId);
    const status_data = await status_resp.json();
    setTransactionStatus(status_data.status);
    if (status_data.status === 'WEBHOOK_SUCCESS_SENT') {
      setMintDone(true);
      setMintStatus('MINTED');
      setTransactionStatus('');
      clearInterval(statusPollingInterval);
      setIsMintingStarted(false);
    }
  };

  useEffect(() => {
    if (!isMintingStarted || !requestId) return;
    statusPollingInterval = setInterval(onMintingStarted, 300);
    return () => clearInterval(statusPollingInterval);
  }, [requestId, isMintingStarted]);

  useEffect(() => {
    ReactRecaptcha3.init(RECAPTCHA_SITE_KEY).then(status => {
      console.log(status);
    });
  }, []);

  const getAccountAddress = async () => {
    if (!address && !!getProviderInstance()) {
      const accounts = await getProviderInstance();
      setAddress(accounts[0]);
    }
  };

  const viewWallet = async () => {
    getMagicInstance()?.wallet.showUI();
  };

  const connectAndMint = async () => {
    try {
      const connectedToWallet = await getMagicInstance()?.wallet.connectWithUI();
      if (IS_NFT_MINTING_AVAILABLE && connectedToWallet && getProviderInstance()) {
        const accounts = await getProviderInstance().listAccounts();
        const acc = accounts[0];
        setAddress(acc);
        mint(acc);
        setIsMintingStarted(true);
      } else if (!IS_NFT_MINTING_AVAILABLE) {
        viewWallet();
      }
    } catch (err) {
      // console.log('SIGN IN CANCELLED');
    }
  };
  const callMint = async add => {
    ReactRecaptcha3.getToken().then(
      async token => {
        try {
          const magic_resp = await fetch('/api/mint', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              address: add,
              tokenId: 1,
              captcha: token,
            }),
          });
          if (magic_resp.status === 400) {
            setPortalsNftUnavailable(true);
            throw new Error('Recaptcha Score');
          }
          if (magic_resp.status === 403) {
            setPortalsNftUnavailable(true);
            throw new Error('Forbidden');
          }
          if (magic_resp.status === 405) {
            setPortalsNftUnavailable(true);
            throw new Error('Method Not Allowed');
          }
          if (magic_resp.status === 429) {
            setMintDone(true);
            throw new Error('Too Many Requests');
          }
          setMintFired(true);
          const mintData = await magic_resp.json();
          if (mintData) {
            setRequestId(mintData.request_id);
          }
          return { mintData };
        } catch (e) {
          console.log(e);
        }
      },
      error => {
        console.log(error);
        setPortalsNftUnavailable(true);
      },
    );
  };

  const mint = async add => {
    if (!add) {
      return;
    }

    callMint(add);
    setIsMintingStarted(true);
    setMintStatus('MINTING');
  };

  const showWallet = () => {
    getMagicInstance()
      ?.wallet.showUI()
      .catch(e => {
        console.log(e);
      });
  };

  const fetchLoginState = () => {
    return getMagicInstance()?.user.isLoggedIn();
  };
  const checkLoginState = async () => {
    const response = await fetchLoginState();
    setUserStateDetermined(true);
    return response;
  };

  const handleHover = e => {
    const { clientX, clientY, currentTarget } = e;

    const { clientWidth, clientHeight, offsetLeft, offsetTop } = card.current as any;

    const horizontal = (clientX - offsetLeft) / clientWidth;
    const vertical = (clientY - offsetTop) / clientHeight;
    const rotateX = (THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(1);
    const rotateY = (vertical * THRESHOLD - THRESHOLD / 2).toFixed(1);

    const targetObject = card.current as any;
    if (targetObject) {
      targetObject.style.transform = `perspective(${
        clientWidth * 2.5
      }px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(1, 1, 1)`;
    }
  };

  const resetStyles = e => {
    const targetObject = card.current as any;
    if (targetObject) {
      targetObject.style.transform = `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
    }
  };

  useEffect(() => {
    let subscribed = true;
    if (subscribed && !address) {
      checkLoginState().then(areThey => {
        setUserLoggedIn(areThey);
        if (!areThey) {
          getAccountAddress();
        }
      });
    }
    return () => {
      subscribed = false;
    };
  }, [address]);

  return (
    <div
      className={clsx(styles.heroDemoWrapper, 'd-flex justify-content-center')}
      onMouseMove={ev => handleHover(ev)}
      onMouseLeave={ev => resetStyles(ev)}
    >
      <div ref={card} className={clsx(styles.heroDemoContainer, 'transformHoverContainer')}>
        <div className={clsx(styles.heroDemoInner, 'd-flex  align-items-center justify-content-center p-4')}>
          <div className={clsx(styles.heroDemoLogoContainer, 'd-flex justify-content-center align-items-center')}>
            <div className={clsx(styles.heroDemoLogoImage)}>
              <Image
                src={heroDemoLogoImage}
                alt="Magic"
                width={180}
                height={180}
                priority
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
          </div>

          {userStateDetermined ? (
            <div className={clsx(styles.demoContentContainer, 'flex-fill')}>
              {mintStatus !== '' ? (
                <div className={clsx('d-flex flex-column align-items-start justify-content-start')}>
                  {!mintDone && !portalsNftUnavailable ? (
                    <div
                      className={clsx(
                        styles.demoProgressSpinnerContainer,
                        'flex-fill d-flex align-items-center justify-content-center mb-3',
                      )}
                    >
                      <Image
                        src={demoProgressSpinnerImage}
                        alt="Minting"
                        className={clsx(styles.demoProgressSpinnerImage)}
                        width={80}
                        height={80}
                        style={{
                          maxWidth: '100%',
                          height: 'auto',
                        }}
                      />
                    </div>
                  ) : null}

                  {!mintDone && portalsNftUnavailable ? (
                    <h3 className={clsx(styles.demoProgressHeadline, 'mb-3')}>Portals NFT Unavailable...</h3>
                  ) : null}
                  {!mintDone && !portalsNftUnavailable ? (
                    <h3 className={clsx(styles.demoProgressHeadline, 'mb-3 textCentered')}>Minting</h3>
                  ) : null}
                  {mintDone && !portalsNftUnavailable ? (
                    <h3 className={clsx(styles.demoProgressHeadline, 'mb-3 textCentered')}>NFT Minted!</h3>
                  ) : null}

                  <div className={clsx(styles.demoProgressSubHeadline, 'textCentered')}>
                    {!mintDone && !portalsNftUnavailable ? (
                      <>
                        {transactionStatus === 'IN_PROGRESS' || transactionStatus === 'QUEUED'
                          ? 'Calling contract...'
                          : null}
                        {transactionStatus === 'MINTED' ? 'Almost done...' : null}
                        {transactionStatus === 'SUCCESS' ? 'Transferring NFT...' : null}
                        {transactionStatus === 'MINT_FAILED' ? 'Mint Failed' : null}
                        {transactionStatus === 'TRANSFER_FAILED' ? 'Transfer Failed' : null}
                        {transactionStatus === 'WEBHOOK_FAILED_SENT' ? 'Failed to Send' : null}
                        {transactionStatus === 'WEBHOOK_FAILED' ? 'Connection Failed' : null}
                      </>
                    ) : null}
                    {!mintDone && portalsNftUnavailable ? (
                      <CallToAction
                        onClick={() => {
                          viewWallet();
                        }}
                        color="secondary"
                        className={clsx(styles.demoButton, 'mt-4 d-block')}
                      >
                        View Wallet
                      </CallToAction>
                    ) : null}
                    {mintDone && !portalsNftUnavailable ? (
                      <>
                        <div>
                          Access your NFT any time at
                          <a
                            href="https://wallet.magic.link/?network=polygon"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            wallet.magic.link
                          </a>
                        </div>

                        <CallToAction
                          onClick={() => {
                            viewWallet();
                          }}
                          color="primary"
                          className={clsx(styles.demoButton, 'mt-4')}
                        >
                          View in Wallet
                        </CallToAction>
                      </>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div
                  className={clsx(
                    styles.securedByContainer,
                    'd-flex flex-column align-items-start justify-content-start',
                  )}
                >
                  <h3 className={clsx(styles.demoHeadline, 'mb-3 mt-3 mt-sm-2')}>Try Magic</h3>
                  <div className={clsx(styles.demoSubHeadline)}>
                    {userLoggedIn ? (
                      <div>
                        Access your NFT any time at
                        <a href="https://wallet.magic.link/?network=polygon" target="_blank" rel="noopener noreferrer">
                          wallet.magic.link
                        </a>
                      </div>
                    ) : (
                      <div>
                        Create a wallet and mint a free NFT in seconds
                        {!IS_NFT_MINTING_AVAILABLE && <b>(Temporarily Unavailable)</b>}
                      </div>
                    )}
                  </div>
                  <div className={clsx('mt-2')}>
                    {!mintFired && !mintDone && !userLoggedIn ? (
                      <CallToAction
                        onClick={() => {
                          AnalyticsService.TrackAction('Mint NFT Clicked');
                          if (address && IS_NFT_MINTING_AVAILABLE) {
                            mint(address);
                          } else {
                            connectAndMint();
                          }
                        }}
                        color="primary"
                        className={clsx(styles.demoButton, 'mt-3')}
                      >
                        {IS_NFT_MINTING_AVAILABLE ? 'Mint NFT' : 'Try Wallet'}
                      </CallToAction>
                    ) : null}
                    {!mintFired && !mintDone && userLoggedIn ? (
                      <CallToAction
                        onClick={() => {
                          AnalyticsService.TrackAction('View Wallet Clicked');
                          viewWallet();
                        }}
                        color="primary"
                        className={clsx(styles.demoButton, 'mt-3')}
                      >
                        View Wallet
                      </CallToAction>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div
              className={clsx(
                styles.demoContentContainer,
                'flex-fill p-4 d-flex align-items-center justify-content-center',
              )}
            >
              <Image
                src={demoProgressSpinnerImage}
                alt="Loading"
                className={clsx(styles.spinner)}
                width={80}
                height={80}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
