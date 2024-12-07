import React, { ReactNode, SVGProps, useCallback, useState } from 'react';
import { clsx } from '@magiclabs/ui';
import { AnimatePresence, motion } from 'framer-motion';
import { Maybe } from 'graphql/generated';

import { RichTextAST } from 'lib/graphcms/rich-text-indexer';
import { RichText } from '../rich-text';

import styles from './accordion.module.less';

export type AccordionData = {
  headline: string | ReactNode | Maybe<RichTextAST>;
  itemKey?: string | number;
  content: ReactNode | Maybe<RichTextAST>;
};

const IconChevronDown = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g id="New Icon">
        <path
          id="Vector"
          d="M19.6175 8.12437L13.2341 15.2475C12.4802 16.0887 11.2466 16.0887 10.4928 15.2475L4.10938 8.12437"
          stroke="#4E4D52"
          strokeWidth="1.93851"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

interface IAccordionProps {
  /**
   * Accrodion Individual Items
   * @default []
   */
  items: Array<AccordionData>;
  /**
   * Allow accordion items to stay open when another item is opened
   * @default false
   */
  alwaysOpen?: boolean;
  /**
   * The current active key that corresponds to the currently expanded card
   * @default 0 | "0"
   */
  activeKey?: string | number;
  /**
   * Accordion Children
   */
  children?: ReactNode;
  /**
   * Allows us from using the dangerouslySetInnerHTML and
   * use the RichText component instead
   */
  richContent?: boolean;

  variant?: 'default' | 'feature';
}

interface IAccordionItemProps {
  /**
   * Accordion Individual Item
   * @default {}
   * @type {AccordionData}
   */
  data: AccordionData;
  /**
   * Whether the accordion item is open or not
   * @default false
   */
  isOpen: boolean;
  /**
   * The onClick handler for the accordion item button
   * @default () => {}
   */
  btnOnClick: () => void;
  /**
   * Accordion Item index or ID
   * @default 0
   */
  itemKey: string | number;
  /**
   * Allows us from using the dangerouslySetInnerHTML and
   * use the RichText component instead
   */
  richContent?: boolean;

  variant?: 'default' | 'feature';
}

const AccordionBase = ({
  items,
  alwaysOpen,
  children,
  activeKey,
  richContent,
  variant = 'default',
}: IAccordionProps) => {
  /**
   * Make sure that even when we have an activeKey the value is not set to more than the length of the items
   */
  const ensureActiveKey = activeKey && Number(activeKey) > items?.length ? '1' : activeKey;
  const [currentIdx, setCurrentIdx] = useState(ensureActiveKey || -1);
  const [isOpened, setIsOpened] = useState(items.map(_ => false));

  const handleItemClick = useCallback(
    (index: number) => {
      if (alwaysOpen) {
        setIsOpened(prev => {
          const newOpened = prev.map((flag, i) => (i === index ? !flag : flag));
          return newOpened;
        });
      } else {
        const next = index + 1;
        if (next === currentIdx) {
          setCurrentIdx(-1);
        } else setCurrentIdx(next);
      }
    },
    [alwaysOpen, currentIdx],
  );

  if (items && children) throw new Error('⚠️ Accordion: Accordion cannot have both items and children');

  return (
    <div className={styles.AccordionGroup}>
      {items &&
        items.map((item, idx) => {
          const modifyIdx = idx + 1;
          const isOpen = alwaysOpen ? isOpened[idx] : modifyIdx === currentIdx;

          return (
            <AccordionItem
              key={`${item.itemKey ?? modifyIdx}`}
              itemKey={item.itemKey ?? modifyIdx}
              data={item}
              richContent={richContent}
              isOpen={isOpen}
              btnOnClick={() => handleItemClick(idx)}
              variant={variant}
            />
          );
        })}
      {children}
    </div>
  );
};

const AccordionItem = ({
  data,
  isOpen,
  itemKey,
  btnOnClick,
  richContent,
  variant = 'default',
}: IAccordionItemProps) => {
  return (
    <div className={clsx([styles.accordionItem, isOpen && styles.active, styles[variant]])}>
      <AccordionHeader headline={data.headline} btnOnClick={btnOnClick} itemKey={itemKey} isOpen={isOpen} />
      <AnimatePresence exitBeforeEnter>
        {isOpen && (
          <motion.div
            initial={{
              height: 0,
            }}
            animate={{
              height: 'auto',
            }}
            exit={{
              height: 0,
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            {richContent ? <RichText content={data.content as Maybe<RichTextAST>} /> : (data.content as ReactNode)}
            <div style={{ height: '20px' }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

AccordionItem.displayName = 'Accordion.Item';

const AccordionHeader = ({
  headline,
  btnOnClick,
  isOpen,
  itemKey,
}: { headline: string | ReactNode | Maybe<RichTextAST> } & Partial<IAccordionItemProps>) => {
  const focusClick = useCallback(
    event => {
      /**
       * When focus is on the accordion header of a collapsed section, expands the section.
       * using Space
       * @see https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html
       */
      if (event.code === 'Space' && !isOpen) {
        event.preventDefault();
        btnOnClick?.();
      }
    },
    [isOpen],
  );

  return (
    <div className="accordion-header">
      <button
        className={styles.accordionItemButton}
        onClick={btnOnClick}
        onKeyUp={focusClick}
        id={`accordion:id:${itemKey}`}
        aria-expanded={isOpen}
        aria-controls={`accordion:section:${itemKey}`}
      >
        <span>{headline as ReactNode}</span>
        <IconChevronDown
          style={{
            transform: !isOpen ? 'rotate(0deg)' : 'rotate(180deg)',
            transition: 'all ease 0.3s',
            margin: '8px',
          }}
        />
      </button>
    </div>
  );
};

AccordionHeader.displayName = 'Accordion.Header';

export const Accordion = Object.assign(AccordionBase, { Item: AccordionItem, Header: AccordionHeader });
