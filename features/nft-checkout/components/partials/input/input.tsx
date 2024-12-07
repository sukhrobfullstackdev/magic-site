import React, { useEffect } from 'react';

import useHubspotForm from 'components/widgets/hubspot-form/useForm';

import styles from './input.module.less';

export const NFTInput = () => {
  const { handleSubmit, isError, isLoading, data } = useHubspotForm({
    portalId: '20846682',
    formId: 'ea2f9cdc-d890-4001-a8d3-3f427c9de79d',
  });

  const isSubmitted = typeof data?.inlineMessage === 'string' && !isError;

  const confettiRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isSubmitted || !confettiRef.current) return;

    const canvas = document.createElement('canvas');
    confettiRef.current.appendChild(canvas);
    canvas.setAttribute('style', 'width: 100%; height: 100%; position: absolute; top: 0; left: 0;');

    import('canvas-confetti').then(({ create }) => {
      create(canvas, {
        resize: true,
      })({
        startVelocity: 20,
        particleCount: 60,
        spread: 150,
        gravity: 0.6,
        origin: { y: 0.42 },
      });
    });

    return () => {
      confettiRef.current?.removeChild(canvas);
    };
  }, [isSubmitted]);

  return !isSubmitted ? (
    <form onSubmit={handleSubmit} className={styles.FormContainer}>
      <input type="email" placeholder="Enter your company email..." name="email" required />
      <button type="submit">{isLoading ? 'Loading...' : 'Get early access'}</button>
    </form>
  ) : (
    <>
      <p className={styles.SubmittedText}>
        You're on the list! Look out for updates in your inbox from the Magic team.
        <span className={styles.Confetti} ref={confettiRef} />
      </p>
    </>
  );
};
