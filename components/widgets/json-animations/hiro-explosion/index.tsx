import React from 'react';
import Lottie from 'react-lottie-player';

import data from './hiro-explosion.json';

export const HiroExplosion: React.FC<any> = props => {
  return <Lottie animationData={data} loop play {...props} />;
};
