/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useRef } from 'react';
import HubspotForm from 'react-hubspot-form';
import styles from './hubspot-form.module.less';

// import '/styles/custom.less';

interface HubspotFormProps {
  hubspotFormId: string;
  hubspotPortalId: string;
}

const HubspotFormEmbed: React.FC<HubspotFormProps> = ({ hubspotFormId, hubspotPortalId }) => {
  return (
    <HubspotForm
      portalId="20846682"
      formId="d87300a6-d212-4c55-a76a-4b49dc776fd1"
      onSubmit={() => console.log('Submit!')}
      onReady={form => console.log('Form ready!')}
      cssClass={(styles.hubspotForm, 'hubspotFormClass')}
      loading={<div>Loading...</div>}
    />
  );
};

export default HubspotFormEmbed;
