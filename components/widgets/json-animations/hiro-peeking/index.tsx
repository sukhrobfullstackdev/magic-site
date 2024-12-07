import React from 'react';
import Lottie from 'react-lottie-player';

import data from './hiro-peeking.json';

export const HiroPeeking: React.FC<any> = props => {
  return <Lottie animationData={data} loop play {...props} />;
};
