const globalConstants = {
  organizationName: 'Tiger Analytics',
  defaultTheme: 'light',
  logoLight: '/assets/images/logo_light.svg',
  logoDark: '/assets/images/logo_dark.svg',
  dashBoardPath: '/dashboard',
  setMaxOfferDefault: 10,
}

const dashboardConstants = [
  {
    title: 'Promo Recommender',
    description:
      'Identify optimal promos for a set of objectives and variables',
    iconPath: '/assets/dashboard/promo_recommender.svg',
    routePath: '/recommender',
  },
  {
    title: 'Scenario Planner',
    description:
      'Simulate the impact of different sets of promos for specific time period',
    iconPath: '/assets/dashboard/Scenario_planner.svg',
    routePath: '/planner',
  },
  {
    title: 'Scenario Comparison',
    description: 'Assess the comparative impact of multiple scenarios',
    iconPath: '/assets/dashboard/Scenario_Comparison.svg',
    routePath: '/comparison',
  },
  {
    title: 'Feed Creation',
    description: 'Create promo feed of selected promos for execution',
    iconPath: '/assets/dashboard/Feed_Creation.svg',
    routePath: '/feed',
  },
]

export { globalConstants, dashboardConstants }
