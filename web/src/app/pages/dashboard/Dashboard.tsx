import DashBoardCard from "app/components/comparison/DashBoardCard";

export default function Dashboard() {
  const dashboardElements = [
    {
      title: "Promo Recommender",
      description:
        "Identify optimal promos for a set of objectives and variables",
      iconPath: "assets/dashboard/promo_recommender.svg",
      routePath: "/recommender",
    },
    {
      title: "Scenario Planner",
      description:
        "Simulate the impact of different sets of promos for specific time period",
      iconPath: "assets/dashboard/Scenario_planner.svg",
      routePath: "/planner",
    },
    {
      title: "Scenario Comparison",
      description: "Assess the comparative impact of multiple scenarios",
      iconPath: "assets/dashboard/Scenario_Comparison.svg",
      routePath: "/comparison",
    },
    {
      title: "Feed Creation",
      description: "Create promo feed of selected promos for execution",
      iconPath: "assets/dashboard/Feed_Creation.svg",
      routePath: "/feed",
    },
  ];
  return (
    <div className="p-10 grid grid-cols-4 gap-4">
      {dashboardElements.map((element) => (
        <DashBoardCard
          key={element.title}
          title={element.title}
          description={element.description}
          icon={element.iconPath}
          routePath={element.routePath}
        />
      ))}
    </div>
  );
}
