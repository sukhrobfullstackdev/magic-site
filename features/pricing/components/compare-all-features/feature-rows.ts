type FeatureRow = {
  name: string;
  description?: string;
  available: (boolean | string)[];
};

export const authenticationFeatureRows: FeatureRow[] = [
  {
    name: 'Email, SMS OTP',
    available: [true, true, true, true],
  },
  {
    name: 'Social Logins',
    description: 'Google, Facebook, X, Apple, Discord, + more',
    available: [true, true, true, true],
  },
  {
    name: 'WebAuthn',
    description: 'Web Only',
    available: [true, true, true, true],
  },
  {
    name: 'User Data Export',
    available: [false, true, true, true],
  },
  {
    name: 'Custom Email Provider (SMTP)',
    available: [false, false, true, true],
  },
  {
    name: 'Bring-Your-Own Auth / Custom Identity Provider (OIDC)',
    available: [false, false, true, true],
  },
  {
    name: 'Account Recovery',
    available: [false, true, true, true],
  },
];

export const walletsFeatureRows: FeatureRow[] = [
  {
    name: 'Key Management',
    available: ['Non-custodial DKMS', 'Non-custodial DKMS', 'Non-custodial DKMS', 'Non-custodial DKMS'],
  },
  {
    name: 'Secure Private Key Export',
    available: [true, true, true, true],
  },
  {
    name: 'Blockchains Supported (Etherum, Polygon, Flow & More)',
    available: ['30+', '30+', '30+', '30+'],
  },
  {
    name: 'Custom Blockchain Support',
    available: [false, false, false, true],
  },
  {
    name: 'Token Gating',
    available: [true, true, true, true],
  },
  {
    name: 'Gas Subsidy',
    available: [false, false, false, true],
  },
];

export const securityFeatureRows: FeatureRow[] = [
  {
    name: 'SOC2 Type II, HIPAA, ISO',
    available: [true, true, true, true],
  },
  {
    name: 'Domain Allow List',
    available: [true, true, true, true],
  },
  {
    name: 'User Allow/Block List',
    available: [true, true, true, true],
  },
  {
    name: 'Device Registration',
    available: [true, true, true, true],
  },
  {
    name: 'Custom Session Lengths',
    available: [true, true, true, true],
  },
  {
    name: 'MFA with Authenticator Apps',
    available: [false, true, true, true],
  },
  {
    name: 'Advanced MFA ',
    description: 'SMS, WebAuthn, Threat-Based, Step-Up',
    available: [false, false, false, true],
  },
];

export const platformFeatureRows: FeatureRow[] = [
  {
    name: 'Team Seats',
    available: ['3', '5', '10', 'Custom'],
  },
  {
    name: 'API Rate Limit',
    available: ['500 /minute', '1,000 /minute', '1,000 /minute', 'Custom'],
  },
  {
    name: 'Enterprise SSO',
    available: [false, false, false, true],
  },
];

export const web3CompabilitiesFeatureRows: FeatureRow[] = [
  {
    name: 'NFT Smart Contract Creation',
    available: [false, false, false, true],
  },
  {
    name: 'NFT Checkout',
    available: [false, false, false, true],
  },
  {
    name: 'NFT Minting',
    available: [false, false, false, true],
  },
];

export const supportFeatureRows: FeatureRow[] = [
  {
    name: 'Community Support (Discord)',
    available: [true, true, true, true],
  },
  {
    name: 'Chat Support',
    available: [true, true, true, true],
  },
  {
    name: 'Priority Support',
    description: '<24hour response time',
    available: [false, true, true, true],
  },
  {
    name: 'Dedicated Slack Channel',
    available: [false, false, true, true],
  },
  {
    name: 'Custom SLAs for Uptime and Support',
    available: [false, false, true, true],
  },
  {
    name: 'Onboarding Support',
    available: [false, false, true, true],
  },
  {
    name: 'Implementation Assistance / Custom Development',
    available: [false, false, true, true],
  },
  {
    name: 'Dedicated Customer Success Team',
    available: [false, false, true, true],
  },
];

export const uiWidgetsFeatureRows: FeatureRow[] = [
  {
    name: 'White-label (no-widget)',
    available: [true, true, true, true],
  },
  {
    name: 'UI Widgets (Select Blockchains) ',
    description: 'Login, View Address/Balances/NFTs, Send Tokens, Fiat On-Ramp',
    available: [true, true, true, true],
  },
];
