import { useState } from "react";
import { useHistory } from "react-router-dom";
import jwt from "jwt-decode";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signInUser } from "../api-requests";
import { userData } from "../redux/actions";

const SignIn = ({ userData }) => {
  const [signIn, setSignIn] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSignIn((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await signInUser(signIn);
    if (data.statusText === "Created") {
      userData({
        isLoggedIn: true,
        userToken: data.data.auth_token,
        userInfo: jwt(data.data.auth_token).name,
      });
      history.push("/");
    }
  };

  return (
    <form>
      <h1>Sign In</h1>
      <input
        type="text"
        id="name"
        placeholder="name"
        required
        onChange={handleChange}
      />
      <input
        type="text"
        id="email"
        placeholder="email"
        required
        onChange={handleChange}
      />
      <input
        type="password"
        id="password"
        placeholder="password"
        required
        onChange={handleChange}
      />
      <input
        type="password"
        id="password_confirmation"
        placeholder="password_confirmation"
        required
        onChange={handleChange}
      />
      <button type="submit" onClick={handleSubmit}>
        Sign in
      </button>
    </form>
  );
};

const mapDispatch = {
  userData,
};

SignIn.propTypes = {
  userData: PropTypes.func.isRequired,
};

export default connect(null, mapDispatch)(SignIn);
