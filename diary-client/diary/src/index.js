import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/Public/App";
import Main from "./components/Protected/Main";
import Register from "./components/Public/Register";

import { Switch, Route, Redirect } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import BrowserRouter from "react-router-dom/BrowserRouter";

const ProtectedRoute = ({ path, component: Component, ...rest }) => {
  return (
    <Route
      path={path}
      render={props => {
        if (!localStorage.getItem("token")) {
          return <Redirect to="/login" />;
        }

        return <Component />;
      }}
    />
  );
};

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={App} />
      <Route path="/register" component={Register} />
      <ProtectedRoute path="/" component={Main} />
    </Switch>
  </BrowserRouter>,

  document.getElementById("root")
);

registerServiceWorker();
//pobaw sie tu routami ogarnij troche jak to dziala
