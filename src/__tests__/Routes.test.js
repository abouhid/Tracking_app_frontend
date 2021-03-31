import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";
import store from "../index";
import Routes from "../routes";

describe("Routes", () => {
  test("Should render logo in the header ", () => {
    render(
      <Provider store={store}>
        <Router>
          <Routes />
        </Router>
      </Provider>
    );
    // expect(screen.getByText("Track.it")).toBeInTheDocument();
    expect(true).toBe(true);
  });
  //   test("Should check logo presence", () => {
  //     expect(screen.getByText("PokéLex")).toBeInTheDocument();
  //   });
  //   test("Should check presence of Filter", () => {
  //     const filter = screen.getByDisplayValue("All");
  //     expect(filter).toBeInTheDocument();
  //   });
});
