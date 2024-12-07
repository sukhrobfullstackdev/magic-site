/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef } from 'react';

import useHubspotForm from './useForm';

import styles from './hubspot-form.module.less';

interface HubspotFormProps {
  /**
   * The Hubspot form ID.
   */
  hubspotFormId: string;
  /**
   * The Hubspot portal ID.
   */
  hubspotPortalId: string;
}

const HubspotLeadGenForm: React.FC<HubspotFormProps> = ({ hubspotFormId, hubspotPortalId }) => {
  const { data, isError, isLoading, handleSubmit } = useHubspotForm({
    portalId: hubspotPortalId,
    formId: hubspotFormId,
  });
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (data?.redirectUri) {
      window.open(data?.redirectUri, '_blank', 'noopener noreferrer');
    }

    if (data) ref?.current?.reset();
  }, [data]);

  return (
    <form onSubmit={handleSubmit} className={styles.hubspotLeadGenFormWrapper} ref={ref} name="Magic Lead Gen Form">
      <div className={styles.hubspotFormLeadGen}>
        {!isLoading && data?.inlineMessage && (
          <div className={styles.success}>
            <p>{data?.inlineMessage}</p>
          </div>
        )}
        <label>First name*</label>
        <input name="firstname" type="text" placeholder="First name" required />
        <label>Work email*</label>
        <input name="email" type="email" placeholder="Work email" required />
        <label>Company’s website</label>
        <input name="0-2/domain" type="text" placeholder="Website URL" />
        <label>Business sector*</label>
        <select name="vertical" required>
          <option value="" selected>
            Select one
          </option>
          <option value="Blockchain">Blockchain</option>
          <option value="NFT Gaming">Blockchain Gaming</option>
          <option value="NFT Marketplace">NFT Marketplace</option>
          <option value="NFT Creator Platform">NFT Creator Platform</option>
          <option value="Crypto Exchange">Crypto Exchange</option>
          <option value="Crypto Wallet">Crypto Wallet</option>
          <option value="Decentralized Exchange (DEX)">Decentralized Exchange (DEX)</option>
          <option value="DeFi">DeFi Platform</option>
          <option value="Developer Tool">Developer Tool</option>
          <option value="EdTech">EdTech</option>
          <option value="Fashion">Fashion</option>
          <option value="Other Dapp">Other</option>
        </select>
        <label>How many monthly active users do you have?*</label>
        <select name="n20k_mau" required>
          <option value="">Select one</option>
          <option value="< 10k MAU">Under 10,000 Monthly Active Users</option>
          <option value="> 10k MAU">Over 10,000 Monthly Active Users</option>
        </select>

        <p>
          Magic Labs, Inc. uses this information to send communications about our products and services. You may
          unsubscribe at any time. See
          <a href="https://magic.link/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
          .
        </p>

        <button type="submit">{!isLoading ? 'Submit' : 'Loading...'}</button>
        {isError && <div className={styles.error}>Please complete all required fields. </div>}
      </div>
    </form>
  );
};

export default HubspotLeadGenForm;
