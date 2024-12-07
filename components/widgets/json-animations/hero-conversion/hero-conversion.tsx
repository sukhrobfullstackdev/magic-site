import React from 'react';
import Lottie from 'react-lottie-player';

import datamagic from './hero-magic-conversion.json';
import datametamask from './hero-magic-metamask.json';

export const HeroMagicConversion: React.FC<any> = props => {
  return <Lottie animationData={datamagic} play loop {...props} />;
};

export const HeroMagicMetaMask: React.FC<any> = props => {
  return <Lottie animationData={datametamask} play loop {...props} />;
};
