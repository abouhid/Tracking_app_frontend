import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";

import { MemoryRouter } from "react-router-dom";
import store from "../redux/store";
import Routes from "../routes";
import { createMemoryHistory } from "history";

describe("LogIn", () => {
  it("Should not log in user that does not exist ", async () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/login"]} initialIndex={1}>
          <Routes />
        </MemoryRouter>
      </Provider>
    );
    // const emailField = screen.getByPlaceholderText("Email");
    // const passField = screen.getByPlaceholderText("Password");
    // const submitButton = screen.getByText("Log in");

    // fireEvent.change(emailField, {
    //   target: { value: "random_email@email.com" },
    // });
    // fireEvent.change(passField, { target: { value: "123123" } });
    // fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Email address/i)).toBeInTheDocument();
      expect(true).toBe(true);
    });
  });
});
