import DeveloperPlanIcon from '../public/images/plans/developer.svg';
import FreePlanIcon from '../public/images/plans/free.svg';
import GrowthPlanIcon from '../public/images/plans/growth.svg';
import EnterpriseIcon from '../public/images/plans/enterprise.svg';
import StarterPlanIcon from '../public/images/plans/starter.svg';

export const PlanTypeInfo = {
  free: {
    label: 'Free',
    icon: FreePlanIcon,
    baseCost: 0,
    baseActiveUserInfo: 'Max 100 active users',
    additionalActiveUserCost: undefined,
    maxActiveUsers: undefined,
    callToAction: 'Get Started',
  },

  starter: {
    label: 'Starter',
    icon: StarterPlanIcon,
    baseCost: 35,
    baseActiveUserInfo: 'Max 500 active users',
    additionalActiveUserCost: undefined,
    maxActiveUsers: undefined,
    callToAction: 'Start Free 14-Day Trial',
  },

  developer: {
    label: 'Developer',
    icon: DeveloperPlanIcon,
    baseCost: 79,
    baseActiveUserInfo: 'For 1,000 active users',
    additionalActiveUserCost: '0.045',
    maxActiveUsers: '5,000',
    callToAction: 'Start Free 14-Day Trial',
  },

  growth: {
    label: 'Growth',
    icon: GrowthPlanIcon,
    baseCost: 327,
    baseActiveUserInfo: 'For 2,500 active users',
    additionalActiveUserCost: '0.09',
    maxActiveUsers: '25,000',
    callToAction: 'Start Free 14-Day Trial',
  },

  enterprise: {
    label: 'Enterprise',
    icon: EnterpriseIcon,
    baseCost: -1,
    baseActiveUserInfo: "Get enterprise-grade support. We're SOC 2 compliant.",
    additionalActiveUserCost: undefined,
    maxActiveUsers: undefined,
    callToAction: 'Contact Us',
  },
};
