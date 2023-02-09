import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import routes from "./constants/routes.config";
import "./App.scss";

const GlobalRoutes = () => useRoutes(routes);

function App() {
  return (
    <Router>
      <GlobalRoutes />
    </Router>
  );
}

export default App;
