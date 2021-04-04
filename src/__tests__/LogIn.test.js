import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";

import { MemoryRouter } from "react-router-dom";
import store from "../redux/store";
import Routes from "../routes";
import { logInUser, saveToken, signInUser } from "../api-requests";
import { userData } from "../redux/actions";
import jwt from "jwt-decode";

const clearStorage = () => {
  localStorage.clear("tokenObj");
  userData({
    isLoggedIn: false,
    userToken: "",
    userInfo: "",
    userId: "",
  });
};

describe("LogIn", () => {
  it("Should log in user ", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes />
        </MemoryRouter>
      </Provider>
    );
    clearStorage();

    const random_name = "test2";
    const random_email = "test2@gmail.com";
    const userPassword = "123123";

    const signInData = await signInUser({
      name: random_name,
      email: random_email,
      password: userPassword,
      password_confirmation: userPassword,
    });

    if (signInData && signInData.statusText === "OK") {
      saveToken(signInData.data.auth_token);
      userData({
        isLoggedIn: true,
        userToken: signInData.data.auth_token,
        userInfo: jwt(signInData.data.auth_token).name,
        userId: jwt(signInData.data.auth_token).user_id,
      });
    }

    const data = await logInUser({
      email: random_email,
      password: userPassword,
    });

    if (data.statusText === "OK") {
      saveToken(data.data.auth_token);
      userData({
        isLoggedIn: true,
        userToken: data.data.auth_token,
        userInfo: jwt(data.data.auth_token).name,
        userId: jwt(data.data.auth_token).user_id,
      });
    }

    const submitButtonLogIn = screen.getByText("Log in");
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: random_email },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: userPassword },
    });

    fireEvent.click(submitButtonLogIn);
    await waitFor(async () => {
      expect(
        screen.getByText(`${random_name}'s Measurements:`)
      ).toBeInTheDocument();
      clearStorage();
    });
  });
});
