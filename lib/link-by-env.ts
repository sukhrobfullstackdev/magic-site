export function generateDashboardLinkByEnv(env = 'prod', path: string) {
  const dashboardSignupLinks = {
    local: `http://localhost:3015/${path}`,
    dev: `https://dashboard.dev.magic.link/${path}`,
    stagef: `https://dashboard.stagef.magic.link/${path}`,
    prod: `https://dashboard.magic.link/${path}`,
  };

  return dashboardSignupLinks[env];
}
