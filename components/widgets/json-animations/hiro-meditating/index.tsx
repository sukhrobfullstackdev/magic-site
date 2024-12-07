import React from 'react';
import Lottie from 'react-lottie-player';

import data from './hiro-meditating.json';

export const HiroMeditating: React.FC<any> = props => {
  return <Lottie animationData={data} loop play {...props} />;
};
