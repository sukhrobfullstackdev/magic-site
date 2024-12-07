import { useEffect } from 'react';
import { getClientLogger } from 'services/client-logger';
import { getMonitoring } from 'services/monitoring';

export default function Support() {
  // on load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      globalThis.monitoring = getMonitoring();
      globalThis.logger = getClientLogger();
    }
  }, []);

  return null;
}
