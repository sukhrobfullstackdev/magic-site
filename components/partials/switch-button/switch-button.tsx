/* eslint-disable jsx-a11y/label-has-associated-control */
import clsx from 'clsx';
import { useDebouncedResizeObserver } from 'hooks/use-debounced-resize-observer';
import React, { useEffect, useRef, useState, type ChangeEvent, type FC } from 'react';
import styles from './switch-button.module.less';

export type OptionType = {
  value: unknown;
  label: string;
};

export type Props = {
  options: [OptionType, OptionType];
  value?: unknown;
  disabled?: boolean;
  onToggle?: (value: unknown) => void;
  className?: string;
};

export const SwitchButton: FC<Props> = ({ options, onToggle, value, disabled = false, className }) => {
  const [indicatorWidths, setIndicatorWidths] = useState<[number, number]>([0, 0]);
  const isFirstOptionActive = value === options[0].value;
  const firstOptionRef = useRef<HTMLLabelElement>(null);
  const secondOptionRef = useRef<HTMLLabelElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { width = 0 } = useDebouncedResizeObserver(containerRef, 100);

  useEffect(() => {
    const firstOptionWidth = firstOptionRef.current ? firstOptionRef.current.getBoundingClientRect().width : 0;
    const secondOptionWidth = secondOptionRef.current ? secondOptionRef.current.getBoundingClientRect().width : 0;

    setIndicatorWidths([firstOptionWidth, secondOptionWidth]);
  }, [width]);

  const handleToggle = (val: unknown) => (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onToggle?.(val);
  };

  return (
    <div
      className={clsx(styles.toggleButtonContainer, disabled && styles.disabled, className)}
      ref={containerRef}
      role="radiogroup"
    >
      <div
        className={clsx(styles.indicator, isFirstOptionActive ? styles.firstActive : styles.secondActive)}
        style={
          {
            '--toggleButtonWidth1': `${indicatorWidths[0]}px`,
            '--toggleButtonWidth2': `${indicatorWidths[1]}px`,
          } as React.CSSProperties
        }
      />
      <label className={clsx(styles.toggleOption, isFirstOptionActive && styles.isActive)} ref={firstOptionRef}>
        <input
          type="radio"
          name="slider-toggle-option"
          checked={isFirstOptionActive}
          onChange={handleToggle(options[0].value)}
        />
        {options[0].label}
      </label>
      <label className={clsx(styles.toggleOption, !isFirstOptionActive && styles.isActive)} ref={secondOptionRef}>
        <input
          type="radio"
          name="slider-toggle-option"
          checked={!isFirstOptionActive}
          onChange={handleToggle(options[1].value)}
        />
        {options[1].label}
      </label>
    </div>
  );
};
