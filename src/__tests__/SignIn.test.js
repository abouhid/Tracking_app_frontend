import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import store from "../redux/store";
import Routes from "../routes";
import { userData } from "../redux/actions";
import { signInUser } from "../api-requests";

const num = Math.floor(Math.random() * 5000);
const random_name = num.toString();
const random_email = num.toString() + "@gmail.com";
const userPassword = "123123";

const clearStorage = () => {
  localStorage.clear("tokenObj");
  userData({
    isLoggedIn: false,
    userToken: "",
    userInfo: "",
    userId: "",
  });
};
describe("SignIn", () => {
  it("Should sign in user ", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes />
        </MemoryRouter>
      </Provider>
    );
    clearStorage();

    // const random_name = "test3";
    // const random_email = "test3@gmail.com";
    // const userPassword = "123123";

    const data = await signInUser({
      name: random_name,
      email: random_email,
      password: userPassword,
      password_confirmation: userPassword,
    });

    if (data && data.statusText === "OK") {
      saveToken(data.data.auth_token);
      userData({
        isLoggedIn: true,
        userToken: data.data.auth_token,
        userInfo: jwt(data.data.auth_token).name,
        userId: jwt(data.data.auth_token).user_id,
      });
    }

    // fireEvent.click(screen.getByText("Don't have an account? Sign Up here!"));

    // fireEvent.change(screen.getByPlaceholderText("Username"), {
    //   target: { value: random_name },
    // });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: random_email },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: userPassword },
    });

    // fireEvent.change(screen.getByPlaceholderText("Password Confirmation"), {
    //   target: { value: userPassword },
    // });

    // const submitButton = screen.getByText("Sign in");
    // fireEvent.click(submitButton);

    // const changePage = screen.getByText(
    //   "Already have an account? Log In here!"
    // );
    // fireEvent.click(changePage);

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
