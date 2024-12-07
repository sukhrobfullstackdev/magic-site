import { LAUNCHDARKLY_SDK_CLIENT_SIDE_ID } from 'constants/config';
import { asyncWithLDProvider, useFlags } from 'launchdarkly-react-client-sdk';
import React, { useEffect, useMemo, useState, type FC, type PropsWithChildren, type ReactNode } from 'react';

type Props = PropsWithChildren<{}>;

type LDFlagSet = {
  selfserveMidTierDashboardUpdate: boolean;
};

export const useLDFlags = () => useFlags<LDFlagSet>();

export const LaunchDarklyProvider = ({ children }: Props) => {
  const [LDProvider, setLDProvider] = useState<null | FC<{ children: ReactNode }>>(null);

  useEffect(() => {
    const initializeLaunchDarkly = async () => {
      if (LDProvider) return;

      const Provider = await asyncWithLDProvider({
        clientSideID: LAUNCHDARKLY_SDK_CLIENT_SIDE_ID,
        context: {
          key: 'anonymous',
        },
        flags: {
          'selfserve-mid-tier-dashboard-update': false,
        },
        reactOptions: {
          useCamelCaseFlagKeys: true,
        },
      });

      setLDProvider(() => Provider);
    };

    initializeLaunchDarkly();
  }, [LDProvider]);

  const ProviderComponent = useMemo(() => {
    return LDProvider ? <LDProvider>{children}</LDProvider> : <>{children}</>;
  }, [LDProvider, children]);

  return ProviderComponent;
};
