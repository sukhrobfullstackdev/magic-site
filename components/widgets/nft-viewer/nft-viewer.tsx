import React from 'react';
import Lottie from 'react-lottie-player';

import data from './nft-viewer.json';

export const NFTViewer: React.FC<any> = props => {
  return <Lottie animationData={data} loop play {...props} />;
};
