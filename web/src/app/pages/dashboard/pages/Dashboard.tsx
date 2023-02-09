// import { div } from '@mui/material'
import "./Dashboard.scss";
import ComparisonLogo from "assets/dashboard/Scenario Comparison.svg";

function Dashboard() {
  const test = () => {
    console.log("test");
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 otherdiv">
          <div className="card main-card-bg">
            <img
              src="assets/dashboard/promo_recommender.svg"
              className="disrec"
              alt="Discount Recommender"
            />
            <div className="dashboard_box dashboard_box_icons">
              <h5 className="title">lang.menus.offer_recommend</h5>
              <p className="content">lang.dashboard.offer_recommend_text</p>
              <p className="secondarybutton">lang.menus.details</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 otherdiv">
          <div className="card main-card-bg">
            <img
              src="assets/dashboard/Scenario_planner.svg"
              className="disrec"
              alt="Scenario Planner"
            />
            <div className="dashboard_box dashboard_box_icons">
              <h5 className="title">lang.menus.scenario_planner</h5>
              <p className="content">lang.dashboard.scenario_planner_text</p>
              <p className="secondarybutton">lang.menus.details</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 otherdiv">
          <div className="card main-card-bg">
            <img
              src={ComparisonLogo}
              className="disrec"
              alt="Scenario Comparison"
            />
            <div onClick={test} className="dashboard_box dashboard_box_icons">
              <h5 className="title">lang.menus.scenario_comparison</h5>
              <p className="content">
                lang.dashboard.scenario_comparison_text | translate
              </p>
              <p className="secondarybutton">lang.menus.details</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 otherdiv">
          <div className="card main-card-bg">
            <img
              src="assets/dashboard/Feed Creation.svg"
              className="disrec"
              alt="Feed Creation"
            />
            <div className="dashboard_box dashboard_box_icons">
              <h5 className="title">lang.menus.feed_creation</h5>
              <p className="content">lang.dashboard.feed_creation_text</p>
              <p className="secondarybutton">lang.menus.details</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
