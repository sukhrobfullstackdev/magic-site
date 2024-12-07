import React from 'react';
import { clsx, mergeProps } from '@magiclabs/ui';
import { motion } from 'framer-motion';

import styles from './card.module.less';

interface CardProps extends React.ComponentProps<typeof motion.div> {
  label?: string;
  theme?: 'light' | 'dark';
}

export const Card: React.FC<CardProps> = ({ children, label, theme = 'light', ...otherProps }) => {
  return (
    <motion.div {...mergeProps({ className: clsx([styles.Card, styles[theme]]) }, otherProps)}>
      {label && <div className={styles.label}>{label}</div>}
      {children}
    </motion.div>
  );
};
