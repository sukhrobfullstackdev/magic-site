/**
 * Rewriting react-hubspot
 * @see https://www.npmjs.com/package/react-hubspot
 * @author Adam Soffer
 */

import { useState, useEffect } from 'react';
import axios from 'axios';
import { AnalyticsService } from 'lib/analytics-service';

interface HubspotFormProps {
  portalId: string;
  formId: string;
}

interface HubspotFormResult {
  inlineMessage?: string;
  redirectUri?: string;
}
const useHubspotForm = ({ portalId, formId }: HubspotFormProps) => {
  const [url] = useState(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`);

  const [data, setData] = useState<HubspotFormResult | null>({});
  const [form, setForm] = useState<HTMLFormElement | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      if (form) {
        const formData = new FormData(form);
        const _data: { fields: Array<{ name: string; value: string | File }> } = {
          fields: [],
        };

        for (const pair of formData.entries()) {
          _data.fields.push({ name: pair[0], value: typeof pair[1] === 'string' ? pair[1].trim() : pair[1] });
        }

        const { data: resultData } = await axios({
          method: 'post',
          url,
          data: _data,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (_data.fields.find(dt => dt?.name === 'n20k_mau' && dt?.value === '< 10k MAU')) {
          setData({
            inlineMessage:
              'Thank you for your interest in Magic, one of our Sales Reps will get in touch with you shortly!',
          });
        } else setData(resultData);

        setTimeout(() => {
          /**
           * Reset the data object to allow users waitlist again
           */
          setData({});
        }, 6000);

        AnalyticsService.TrackAction(`${formId} Form Submission`);

        setForm(null);

        setIsError(false);
      }
    } catch (e) {
      setIsError(true);
      setForm(null);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (form) {
      fetchData();
    }
  }, [form]);

  const handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();

    setForm(e.target);
  };

  return { data, isLoading, isError, handleSubmit };
};

export default useHubspotForm;
