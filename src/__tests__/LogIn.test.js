import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";

import { Router } from "react-router-dom";
import store from "../redux/store";
import Routes from "../routes";
import Header from "../containers/Header";
import { logInUser, signInUser } from "../api-requests";
import { userData } from "../redux/actions";
import jwt from "jwt-decode";
import { createMemoryHistory } from "history";

describe("Routes", () => {
  it("Should render username ", async () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    );
    const emailField = screen.getByPlaceholderText("Email");
    const passField = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByText("Log in");

    fireEvent.change(emailField, {
      target: { value: "alexandre.bouhid@engenharia.ufjf.br" },
    });
    fireEvent.change(passField, { target: { value: "123123" } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(
        screen.getByText(/Welcome Alexandre Queiroz Zamagna Bouhid/i)
      ).toBeInTheDocument();
    });
  });
});
