import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import userReducer from "./redux/reducers/user";
import measureReducer from "./redux/reducers/measures";

import Routes from "./routes";
import "./index.css";

const rootReducer = combineReducers({
  userStore: userReducer,
  measureStore: measureReducer,
});

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
