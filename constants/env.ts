export enum ENVType {
  Prod = 'prod',
  Dev = 'dev',
  Stagef = 'stagef',
  PreviewDeployments = 'preview-deployments',
  Local = 'local',
  Test = 'test',
}

export const NODE_ENV = process.env.NODE_ENV || '';
export const DEPLOY_ENV = (process.env.NEXT_PUBLIC_DEPLOY_ENV as ENVType) || ENVType.Prod;
export const DEPLOY_URL = process.env.NEXT_PUBLIC_DEPLOY_URL;
export const DATADOG_CLIENT_KEY = process.env.NEXT_PUBLIC_DATADOG_CLIENT_KEY || 'ccccb3365315ea717e6527fa01b1f891';
export const DATADOG_RUM_APP_KEY =
  process.env.NEXT_PUBLIC_DATADOG_RUM_APP_KEY || '86e7b5a6-29d3-4e88-969e-d686edb0d82c';
export const DATADOG_RUM_CLIENT_KEY =
  process.env.NEXT_PUBLIC_DATADOG_RUM_CLIENT_KEY || 'pub174dff0fc858b42978e99c5c6c9fe3df';
// this is the version of the code that is deployed to Vercel based on the commit SHA
export const GIT_COMMIT_SHA = process.env.NEXT_PUBLIC_GIT_COMMIT_SHA || '';

export const IS_PROD_ENV = DEPLOY_ENV === ENVType.Prod;
