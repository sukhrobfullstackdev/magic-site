import React from 'react';
import { Media } from '@magiclabs/ui';

import useHubspotForm from './useForm';

import styles from './hubspot-form.module.less';

interface HubspotFormProps {
  placeholder: string;
  buttonLabel: string;
  /**
   * Success message to display after form submission
   */
  successMessage?: string;
  /**
   * The Hubspot form ID.
   */
  hubspotFormId: string;
  /**
   * The Hubspot portal ID.
   */
  hubspotPortalId: string;
}

const HubspotForm: React.FC<HubspotFormProps> = ({
  placeholder,
  buttonLabel = 'Get Early Access',
  successMessage = 'Horray',
  hubspotFormId,
  hubspotPortalId,
}) => {
  const { data, isLoading, handleSubmit } = useHubspotForm({
    portalId: hubspotPortalId,
    formId: hubspotFormId,
  });

  return (
    <form onSubmit={handleSubmit} className={styles.hubspotFormWrapper}>
      <div className={styles.hubspotForm}>
        {!isLoading && data?.inlineMessage ? (
          <div className={styles.success}>{successMessage}</div>
        ) : (
          <input name="email" type="email" placeholder={placeholder} required />
        )}

        <button type="submit">
          <Media greaterThanOrEqual="lg">{!isLoading ? buttonLabel : 'Loading...'}</Media>
          <Media lessThan="lg">{!isLoading ? <img src="/images/icons/arrow-right.svg" alt="" /> : '...'}</Media>
        </button>
      </div>
    </form>
  );
};

export default HubspotForm;
