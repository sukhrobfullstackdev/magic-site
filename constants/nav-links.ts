import { AnalyticsService } from 'lib/analytics-service';

export const INITIALIZE_CONTACT_OVERLAY = 'INITIALIZE_CONTACT_OVERLAY';

/**
 * Schema:
 *
 * [
 *   { categoryLabel, links: [{ label, href, onPress }] },
 *   ...
 * ]
 */
export const footerLinks = [
  {
    categoryLabel: 'About',
    links: [
      {
        label: 'Blog',
        href: '/blogs',
        onPress: () => {
          AnalyticsService.TrackAction('Blogs Opened');
        },
      },
      {
        label: 'Brand Assets',
        href: '/brand-assets',
      },
      {
        label: 'Careers',
        href: 'https://job-boards.greenhouse.io/magic',
      },
      {
        label: 'Contact Us',
        href: '/contact',
      },
    ],
  },
  {
    categoryLabel: 'Developers',
    links: [
      {
        label: 'Docs',
        href: '/docs',
        onPress: () => {
          AnalyticsService.TrackAction('Docs Opened');
        },
      },
      { label: 'Guides', href: '/guides' },
      { label: 'GitHub', href: 'https://github.com/MagicLabs' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },

  {
    categoryLabel: 'Resources',
    links: [
      { label: 'Status Page', href: 'https://status.magic.link' },
      { label: 'Trust Center', href: 'https://trust.magic.link/' },
      { label: 'Whistleblower Hotline', href: 'https://forms.gle/MDUssmoKgZDVa43h9' },
      { label: 'Compliance', href: '/docs/home/security/security-compliance' },
      { label: 'Security', href: '/docs/home/security/product-security' },
    ],
  },

  {
    categoryLabel: 'Social',
    links: [
      { label: 'X', href: 'https://twitter.com/magic_labs' },
      { label: 'Discord', href: 'https://discord.gg/magiclabs' },
      { label: 'Farcaster', href: 'https://warpcast.com/magiclabs' },
      { label: 'Linkedin', href: 'https://www.linkedin.com/company/magiclabs-inc/' },
      { label: 'YouTube', href: 'https://www.youtube.com/channel/UCe9Itc4HfUnqXO4wJk9mo3Q/' },
    ],
  },
];

/**
 * Schema:
 *
 * [
 *   { categoryLabel, links: [{ label, href, onPress }] },
 *   ...
 * ]
 */
export const legalNavLinks = [
  {
    categoryLabel: 'Privacy',
    links: [{ label: 'Privacy Policy', href: '/legal/privacy-policy' }],
  },

  {
    categoryLabel: 'Terms of Service',
    links: [{ label: 'Terms of Service', href: '/legal/terms-of-service' }],
  },

  {
    categoryLabel: 'License Agreement',
    links: [{ label: 'API & SDK License Agreement', href: '/legal/developer-license-agreement' }],
  },
];

export const MAINNAV_LEFT_LINK = [
  {
    label: 'Products',
    url: '#!',
    children: [
      {
        label: 'Magic Connect',
        details: 'Seamless Web3 onboarding',
        url: '/connect',
        icon: '/images/icons/home/connect.svg',
      },
      {
        label: 'Magic Auth',
        details: 'Auth and wallet infrastructure',
        url: '/auth',
        icon: '/images/icons/home/auth.svg',
      },
    ],
  },
  {
    label: 'Pricing',
    url: '/pricing',
  },
  {
    label: 'Developers',
    url: '#',

    children: [
      {
        label: 'Documentation',
        url: '/docs',
        icon: '/images/icons/home/documentation.svg',
        analyticsLabel: '[Main Nav]: Documentation Opens',
      },
      {
        label: 'Help Center',
        url: 'https://help.magic.link/knowledge',
        icon: '/images/icons/home/icon-help.svg',
        analyticsLabel: '[Main Nav]: Help Center Opens',
      },
      {
        label: 'Guides',
        url: '/guides',
        icon: '/images/icons/home/icon-guides.svg',
        analyticsLabel: '[Main Nav]: Guides Opens',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/magiclabs',
        icon: '/images/icons/home/icon-github.svg',
        analyticsLabel: '[Main Nav]: GitHub Opens',
      },
    ],
  },
  {
    label: 'Resources',
    url: '#',

    children: [
      {
        label: 'Blog',
        url: '/blogs',
        icon: '/images/icons/home/icon-blog.svg',
        analyticsLabel: '[Main Nav]: Blog Opens',
      },
      /* {
        label: 'Compliance',
        url: '/docs/introduction/security#security-audits-and-compliance',
        icon: '/images/icons/home/icon-compliance.svg',
      }, */
      {
        label: 'Brand Assets',
        url: '/brand-assets',
        icon: '/images/icons/home/icon-brand-assets.svg',
      },
      {
        label: 'Security',
        url: '/docs/introduction/security',
        icon: '/images/icons/home/icon-security.svg',
      },
      {
        label: 'Whitepaper',
        url: 'https://go.magic.link/whitepaper',
        icon: '/images/icons/home/icon-whitepaper.svg',
      },
      {
        label: 'Privacy Policy',
        url: '/legal/privacy-policy',
        icon: '/images/icons/home/icon-privacy.svg',
      },
      {
        label: 'Legal',
        url: '/legal',
        icon: '/images/icons/home/icon-legal.svg',
      },
    ],
  },
  {
    label: 'Company',
    url: '#',
    children: [
      {
        label: 'Careers',
        url: '/careers',
        icon: '/images/icons/home/icon-careers.svg',
        analyticsLabel: '[Main Nav]: Careers Opens',
      },
      {
        label: 'Contact us',
        url: '/contact',
        icon: '/images/icons/home/icon-contact.svg',
        analyticsLabel: '[Main Nav]: Contact Opens',
      },
    ],
  },
];
