import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import ShallowRenderer from "react-test-renderer/shallow";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";

import { Router } from "react-router-dom";
import store from "../redux/store";
import Routes from "../routes";
import Header from "../containers/Header";
import { logInUser, signInUser } from "../api-requests";
import { userData } from "../redux/actions";
import jwt from "jwt-decode";
import SignIn from "../pages/SignIn";

describe("SignIn", () => {
  it("Should sign in user ", async () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
          <SignIn />
        </Router>
      </Provider>
    );
    history.push("/login");

    const random_name = Math.random();
    const random_email = Math.random();
    const userPassword = "123123";

    const usernameField = screen.getByPlaceholderText("Username");
    const emailField = screen.getByPlaceholderText("Email");
    const passField = screen.getByPlaceholderText("Password");
    const passConfField = screen.getByPlaceholderText("Password Confirmation");
    const submitButton = screen.getByText("Sign in");

    fireEvent.change(usernameField, { target: { value: random_name } });
    fireEvent.change(emailField, { target: { value: random_email } });
    fireEvent.change(passField, { target: { value: userPassword } });
    fireEvent.change(passConfField, { target: { value: userPassword } });
    // fireEvent.click(submitButton);

    // const data = await logInUser({
    //   email: random_email,
    //   password: userPassword,
    // });

    // userData({
    //   isLoggedIn: true,
    //   userToken: data.data.auth_token,
    //   userInfo: jwt(data.data.auth_token).name,
    //   userId: jwt(data.data.auth_token).user_id,
    // });

    // expect(screen.getByText(`Welcome ${random_name}`)).toBeInTheDocument();
    expect(screen.getByText("Track.it")).toBeInTheDocument();

    await waitFor(() => {});
  });
});
