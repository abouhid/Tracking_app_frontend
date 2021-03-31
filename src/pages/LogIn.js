import PropTypes from "prop-types";
import { useState } from "react";
import { connect } from "react-redux";
import jwt from "jwt-decode";
import { useHistory } from "react-router-dom";
import { logInUser } from "../api-requests";
import { userData } from "../redux/actions";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const LogIn = ({ userData }) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await logInUser(state);
    if (data.statusText === "OK") {
      const populateReduxStore = {
        isLoggedIn: true,
        userToken: data.data.auth_token,
        userInfo: jwt(data.data.auth_token).name,
        userId: jwt(data.data.auth_token).user_id,
      };
      userData(populateReduxStore);
      history.push("/");
    }
  };

  return (
    <div className="LogIn d-flex">
      <Form className="mb-5 align-self-center" onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            id="email"
            placeholder="email"
            required
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            placeholder="password"
            required
            onChange={handleChange}
          />
        </Form.Group>
        <Button className="submit" type="submit">
          Log in
        </Button>
        <Link to={{ pathname: "/signin" }}>
          <p className="mt-4"> Don't have an account? Sign Up here!</p>
        </Link>
      </Form>
    </div>
  );
};

const mapDispatch = {
  userData,
};

LogIn.propTypes = {
  userData: PropTypes.func.isRequired,
};

export default connect(null, mapDispatch)(LogIn);
