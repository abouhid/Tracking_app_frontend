import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";

import { BrowserRouter as Router } from "react-router-dom";
import store from "../redux/store";
import Routes from "../routes";
import Header from "../containers/Header";
import { logInUser, signInUser } from "../api-requests";
import { userData } from "../redux/actions";
import jwt from "jwt-decode";

describe("Routes", () => {
  it("Should render name in the header ", () => {
    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );
    expect(screen.getByText("Track.it")).toBeInTheDocument();
  });
  it("Should not show user if logged out", () => {
    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );
    const menuAppbar = document.getElementById("menu-appbar");
    expect(menuAppbar).not.toBeInTheDocument();
  });
  // fit("Should show user if logged in", async () => {
  //   render(
  //     <Provider store={store}>
  //       <Router>
  //         <Header />
  //       </Router>
  //     </Provider>
  //   );

  //   const random_name = Math.random(5000);
  //   const random_email = Math.random(5000);
  //   const userPassword = "123123";
  //   const newUser = {
  //     name: random_name,
  //     email: random_email,
  //     password: userPassword,
  //     password_confirmation: userPassword,
  //   };
  //   const data = await signInUser(newUser);
  //   userData({
  //     isLoggedIn: true,
  //     userToken: data.data.auth_token,
  //     userInfo: jwt(data.data.auth_token).name,
  //   });

  //   // await logInUser({
  //   //   email: random_email,
  //   //   password: userPassword,
  //   // });

  //   const menuAppbar = document.getElementById("menu-appbar");
  //   expect(menuAppbar).toBeInTheDocument();
  // });
});
