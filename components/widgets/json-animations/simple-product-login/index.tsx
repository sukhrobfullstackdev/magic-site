import React from 'react';
import Lottie from 'react-lottie-player';

import data from './simple-product-login.json';

export const SimpleProductLogin: React.FC<any> = props => {
  return <Lottie animationData={data} loop play {...props} />;
};
