import React from 'react';
import Lottie from 'react-lottie-player';

import data from './hiro-astronaut.json';

export const HiroAstronaut: React.FC<any> = props => {
  return <Lottie animationData={data} loop play {...props} />;
};
