import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { Provider } from "react-redux";
import routes from "./constants/routes.config";
import "./App.scss";
import store from "./store/store";

const GlobalRoutes = () => useRoutes(routes);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <GlobalRoutes />
      </Router>
    </Provider>
  );
}

export default App;
