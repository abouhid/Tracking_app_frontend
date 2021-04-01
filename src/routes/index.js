import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Footer from "../containers/Footer";
import Header from "../containers/Header";
import LogIn from "../pages/LogIn";
import ProgressPage from "../pages/ProgressPage";
import MeasurementPage from "../pages/MeasurementPage";
import SigIn from "../pages/SignIn";

const Routes = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={ProgressPage} />
      <Route exact path="/login" component={LogIn} />
      <Route exact path="/signin" component={SigIn} />
      <Route exact path="/measurements/:id" component={MeasurementPage} />
    </Switch>
    <Footer />
  </BrowserRouter>
);

export default Routes;
