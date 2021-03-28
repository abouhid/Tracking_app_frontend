import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LogIn from "../pages/LogIn";
import MainPage from "../pages/MainPage";
import SigIn from "../pages/SignIn";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/login" component={LogIn} />
      <Route exact path="/signin" component={SigIn} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
