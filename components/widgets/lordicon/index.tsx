import React from 'react';
import dynamic from 'next/dynamic';

const LordiconPlayerNoSSR = dynamic(() => import('./lordicon-player'), {
  ssr: false,
});
interface LordiconInterface {
  icon: any;
  name: string;
  size: number;
  color: string;
  once?: boolean;
}
const Lordicon: React.FC<LordiconInterface> = ({ size, icon, name, color, once }) => {
  return <LordiconPlayerNoSSR size={size} icon={icon} name={name} color={color} once={once} />;
};

export default Lordicon;
