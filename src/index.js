import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import userReducer from "./redux/reducers/user";
import measureReducer from "./redux/reducers/measures";
import { Grid } from "@material-ui/core";

import Routes from "./routes";
import "./index.css";

const rootReducer = combineReducers({
  userStore: userReducer,
  measureStore: measureReducer,
});

const store = createStore(rootReducer);

ReactDOM.render(
  <Grid container direction="row" justify="center" alignItems="center">
    <Grid item md={3}></Grid>
    <Grid
      md={6}
      container
      direction="column"
      justify="center"
      alignItems="center"
      className="mainApp"
    >
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    </Grid>

    <Grid item md={3}></Grid>
  </Grid>,
  document.getElementById("root")
);
