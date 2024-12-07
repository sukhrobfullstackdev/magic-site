import { debounce } from 'lodash';
import { useCallback, useState, type RefCallback, type RefObject } from 'react';
import useResizeObserver from 'use-resize-observer';

export const useDebouncedResizeObserver = (
  resizeRef: RefObject<HTMLElement>,
  wait = 0,
): {
  ref: RefCallback<HTMLElement>;
  width?: number;
  height?: number;
} => {
  const [size, setSize] = useState<{ width?: number; height?: number }>({});

  const onResize = useCallback(debounce(setSize, wait, { leading: true }), [resizeRef, wait]);

  const { ref } = useResizeObserver({ ref: resizeRef, onResize });
  return { ref, ...size };
};
