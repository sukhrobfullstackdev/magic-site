import React from 'react';
import Lottie from 'react-lottie-player';

import data from './hiro-rocket.json';

export const HiroRocket: React.FC<any> = props => {
  return <Lottie animationData={data} loop play {...props} />;
};
