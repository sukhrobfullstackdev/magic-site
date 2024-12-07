import React, { useEffect, useCallback, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useIsMounted } from 'usable-react';
import { clsx } from '@magiclabs/ui';
import { AnimatePresence, motion } from 'framer-motion';

import closeIcon from '../../../public/images/icons/icon-close.svg';

import styles from './modal.module.less';

interface ModalParentProps {
  /**
   * Allow to different sizes of modal either large or small modal.
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * When set to `true` The modal will show itself.
   */
  in?: boolean;

  /**
   * Close the modal when escape key is pressed
   */
  keyboard?: boolean;

  /**
   * A callback fired to close modal and its backdrop
   * Required
   */
  onClose: () => void;

  /**
   * vertically center the Modal content in the window
   */
  centered?: boolean;

  /**
   * users can directly load the header component with the title prop
   */
  title?: string;

  /**
   * Enable double scrolling and allow users to scroll on body
   */
  bodyScroll?: boolean;

  children: ReactNode;
}

const ModalParent: React.FC<ModalParentProps> = ({
  in: inProp,
  size,
  children,
  keyboard,
  centered,
  onClose,
  title,
  bodyScroll,
  ...rest
}) => {
  let next__container;
  /**
   * Check if window is initialized so we dont load
   * the `next__container` on a null document
   */

  if (process.browser) {
    /**
     * Get the universal `__next` div element and append our new modal
     */
    const parentElement = document.querySelector('#__next');
    next__container = parentElement;
  }

  const closeOnEscapeKeyDown = useCallback(e => {
    /**
     * Return early if we user disables the keyboard interactions
     */
    if (!keyboard) return;

    /**
     * Close the modal when escape key is fired
     */
    if ((e.charCode || e.keyCode) === 27) {
      onClose();
    }
  }, []);

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
  }, [closeOnEscapeKeyDown]);

  /**
   * Create a focus trap for just focusable elements in the moadl
   */
  useEffect(() => {
    const OUTER_MODAL_EL = '#__next > div:not(.magic__modal)';
    /**
     * All focusable elements to consider for the focusable interaction
     */
    const focusableElements = [
      `${OUTER_MODAL_EL} a`,
      `${OUTER_MODAL_EL} button`,
      `${OUTER_MODAL_EL} input`,
      `${OUTER_MODAL_EL} select`,
      `${OUTER_MODAL_EL} textarea`,
      `${OUTER_MODAL_EL} area`,
    ];

    /**
     * query selector all `focusableElements`
     */
    const outerLayerElements = document.querySelectorAll(focusableElements.join(', '));

    if (inProp) {
      /**
       * Remove focus from elements when modal is opened
       */
      outerLayerElements.forEach(el => {
        el.setAttribute('tabindex', '-1');
        el.setAttribute('aria-hidden', 'true');
      });

      /**
       * Disable body scroll and attach focus to just the modal
       */
      if (!bodyScroll) document.body.style.overflow = 'hidden';
    }

    /**
     * Cleanup all the DOM manipulation
     */
    return () => {
      outerLayerElements.forEach(el => {
        el.removeAttribute('tabindex');
        el.removeAttribute('aria-hidden');
        if (!bodyScroll) document.body.style.overflow = 'auto';
      });
    };
  }, [inProp, bodyScroll]);

  return useIsMounted() && next__container
    ? createPortal(
        <>
          <AnimatePresence initial exitBeforeEnter>
            {inProp && (
              <motion.div
                className={clsx(['magic__modal', styles.modal, centered && styles.centered])}
                role="dialog"
                aria-modal={inProp}
                aria-hidden={!inProp}
                onClick={onClose}
                tabIndex={-1}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.05 }}
                {...rest}
              >
                <motion.div
                  initial={{ opacity: 0.5, scale: 0.9 }}
                  exit={{ scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.03 }}
                  className={clsx([styles.modalContent, styles[size!]])}
                  onClick={e => e.stopPropagation()}
                >
                  {/* Check if we have title props and render ModalHeader */}
                  {title && <ModalHeader title={title} onClose={onClose} />}

                  {children}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>,

        next__container,
      )
    : null;
};

ModalParent.displayName = 'Modal';
ModalParent.defaultProps = {
  in: false,
  keyboard: true,
  size: 'md',
  centered: false,
  bodyScroll: false,
};

interface ModalHeaderProps {
  title?: string;
  onClose: () => void;
  children?: ReactNode;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ title, onClose, children, ...rest }) => {
  return (
    <div className={styles.modalHeader} {...rest}>
      {children || <h3>{title}</h3>}
      <button aria-label="Close Modal" type="button" onClick={onClose} className={styles.close}>
        <img src={closeIcon} aria-hidden="true" alt="close icon" />
      </button>
    </div>
  );
};

ModalHeader.displayName = 'Modal.Header';

interface ModalFooterProps {
  children: ReactNode;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ children, ...rest }) => {
  return (
    <div className={styles.footer} {...rest}>
      {children}
    </div>
  );
};

ModalFooter.displayName = 'Modal.Footer';

interface ModalBodyProps {
  noPadding?: boolean;
  children: ReactNode;
}

const ModalBody: React.FC<ModalBodyProps> = ({ children, noPadding, ...rest }) => {
  return (
    <div className={clsx([styles.modalBody, noPadding && styles.noPadding])} {...rest}>
      {children}
    </div>
  );
};

ModalBody.displayName = 'Modal.Body';

export const Modal = Object.assign(ModalParent, { Header: ModalHeader, Footer: ModalFooter, Body: ModalBody });
