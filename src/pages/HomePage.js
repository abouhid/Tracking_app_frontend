import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <p>You are not logged in!</p>
      <Link to={{ pathname: "/login" }}>Log In</Link>
      <Link to={{ pathname: "/signin" }}>Sign In</Link>
    </>
  );
};

export default HomePage;
