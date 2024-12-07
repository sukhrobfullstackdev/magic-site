/* eslint-disable no-bitwise */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */

import { mergeProps } from '@magiclabs/ui';
import React, { useCallback } from 'react';

interface GradientTextProps {
  data?: string;
  gradient?: string[];
}

interface Ops {
  store: Array<(char: string, i: number, accum: Record<string, any>) => void>;
  add: (fn: (char: string, i: number, accum: Record<string, any>) => void) => void;
  run: (char: string, i: number) => Record<string, any>;
}

export const GradientText: React.FC<GradientTextProps> = props => {
  const { data = '', gradient = [] } = props;
  if (data === '') return null;

  const chars = data.split('');

  const ops: Ops = {
    store: [],
    add: useCallback(fn => ops.store.push(fn), []),
    run: useCallback((char, i) => {
      const accum = {};
      ops.store.forEach(fn => fn(char, i, accum));
      return accum;
    }, []),
  };

  // Color mapping
  if (gradient.length === 1) {
    ops.add((char, i, styles) => {
      styles.color = gradient[0];
    });
  } else if (gradient.length === 2) {
    ops.add((char, i, styles) => {
      styles.color = lerpHexColor(gradient[0], gradient[1], i / chars.length);
    });
  } else if (gradient.length > 2) {
    throw new Error('[GradientText] Please provide no more than 2 colors (from & to).');
  }

  const renderedChars = chars.map((char, i) => {
    const style = ops.run(char, i);
    return (
      // eslint-disable-next-line react/no-array-index-key
      <span key={`${char}:${i}`} {...mergeProps({ style }, { style: { font: 'inherit' } })}>
        {char}
      </span>
    );
  });

  return <span>{renderedChars}</span>;
};

/**
 * A linear interpolator for hexadecimal colors.
 *
 * @source https://gist.github.com/rosszurowski/67f04465c424a9bc0dae
 */
function lerpHexColor(a: string, b: string, amount: number) {
  const ah = parseInt(a.replace(/#/g, ''), 16);
  const ar = ah >> 16;
  const ag = (ah >> 8) & 0xff;
  const ab = ah & 0xff;

  const bh = parseInt(b.replace(/#/g, ''), 16);
  const br = bh >> 16;
  const bg = (bh >> 8) & 0xff;
  const bb = bh & 0xff;

  const rr = ar + amount * (br - ar);
  const rg = ag + amount * (bg - ag);
  const rb = ab + amount * (bb - ab);

  return `#${(((1 << 24) + (rr << 16) + (rg << 8) + rb) | 0).toString(16).slice(1)}`;
}
