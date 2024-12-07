import React from 'react';
import Lottie from 'react-lottie-player';

import data from './homepage-product-login.json';

export const HomepageProductLogin: React.FC<any> = props => {
  return <Lottie animationData={data} play loop {...props} />;
};
