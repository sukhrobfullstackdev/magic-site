import React from 'react';
import Lottie from 'react-lottie-player';

import data from './hiro-blockchain.json';

export const HiroBlockchain: React.FC<any> = props => {
  return <Lottie animationData={data} loop play {...props} />;
};
