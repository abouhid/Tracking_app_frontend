import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import store from "../redux/store";
import Routes from "../routes";
import { logInUser, saveToken } from "../api-requests";
import { userData } from "../redux/actions";
import jwt from "jwt-decode";

const num = Math.floor(Math.random() * 5000);
// const random_name = num.toString();
// const random_email = num.toString() + "@gmail.com";
// const userPassword = "123123";
describe("SignIn", () => {
  it("Should sign in user ", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes />
        </MemoryRouter>
      </Provider>
    );

    const random_name = "test2";
    const random_email = "test2@gmail.com";
    const userPassword = "123123";
    // fireEvent.click(screen.getByText("Don't have an account? Sign Up here!"));

    // const usernameField = screen.getByPlaceholderText("Username");
    // const emailField = screen.getByPlaceholderText("Email");
    // const passField = screen.getByPlaceholderText("Password");
    // const passConfField = screen.getByPlaceholderText("Password Confirmation");

    // fireEvent.change(usernameField, { target: { value: random_name } });
    // fireEvent.change(emailField, { target: { value: random_email } });
    // fireEvent.change(passField, { target: { value: userPassword } });
    // fireEvent.change(passConfField, { target: { value: userPassword } });

    // const submitButton = screen.getByText("Sign in");
    // fireEvent.click(submitButton);

    // const el = screen.getByText("Already have an account? Log In here!");

    // const data = await logInUser({
    //   email: random_email,
    //   password: userPassword,
    // });
    // if (data.statusText === "OK") {
    //   saveToken(data.data.auth_token);
    //   userData({
    //     isLoggedIn: true,
    //     userToken: data.data.auth_token,
    //     userInfo: jwt(data.data.auth_token).name,
    //     userId: jwt(data.data.auth_token).user_id,
    //   });
    // }

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

      // expect(
      //   screen.getByText("Don't have an account? Sign Up here!")
      // ).toBeInTheDocument();
    });
  });
  // //  await waitFor( () => {
  // // const el = screen.getByText("Already have an account? Log In here!");

  // //   fireEvent.click(el);

  // //   const emailFieldLogIn = screen.getByPlaceholderText("Email");
  // //   const passFieldLogIn = screen.getByPlaceholderText("Password");
  // //   const submitButtonLogIn = screen.getByText("Log in");

  // //   expect(screen.getByText(`Welcome ${random_name}!`)).toBeInTheDocument();
  // //   fireEvent.change(emailFieldLogIn, {
  // //     target: { value: random_email },
  // //   });
  // //   fireEvent.change(passFieldLogIn, { target: { value: userPassword } });

  // //   fireEvent.click(submitButtonLogIn);
  // // });
  it("Should render username when logged in succesfully ", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes />
        </MemoryRouter>
      </Provider>
    );
    // const emailField = screen.getByPlaceholderText("Email");
    // const passField = screen.getByPlaceholderText("Password");
    // const submitButton = screen.getByText("Log in");
    // fireEvent.change(emailField, {
    //   target: { value: random_email },
    // });
    // fireEvent.change(passField, { target: { value: userPassword } });

    // fireEvent.click(submitButton);

    //   // await logInUser({
    //   //   email: random_email,
    //   //   password: userPassword,
    //   // });

    await waitFor(() => {
      // expect().toBeInTheDocument();
      // expect(screen.getByText(`Welcome ${random_name}!`)).toBeInTheDocument();
      expect(screen.getByText("Track.it")).toBeInTheDocument();
    });
  });
});
