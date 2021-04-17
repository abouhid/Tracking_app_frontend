import { useState } from "react";
import { useHistory } from "react-router-dom";
import jwt from "jwt-decode";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { saveToken, signInUser } from "../api-requests";
import { userData } from "../redux/actions";
import Form from "react-bootstrap/Form";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const SignIn = ({ userData }) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
      saveToken(data.data.auth_token);
      userData({
        isLoggedIn: true,
        userToken: data.data.auth_token,
        userInfo: jwt(data.data.auth_token).name,
      });

      history.push("/");
    } else {
      setShow(true);
      setError(data.data.message);
    }
  };

  return (
    <div className="Page d-flex">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error </Modal.Title>
        </Modal.Header>

        <Modal.Body>{error}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Form className="mb-5 align-self-center" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            id="name"
            placeholder="Username"
            required
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            id="email"
            placeholder="Email"
            required
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control
            type="password"
            id="password_confirmation"
            placeholder="Password Confirmation"
            required
            onChange={handleChange}
          />
        </Form.Group>
        <Button className="submit" type="submit" onClick={handleSubmit}>
          Sign in
        </Button>
        <Link to="/">
          <p className="mt-4"> Already have an account? Log In here!</p>
        </Link>
      </Form>
    </div>
  );
};

const mapDispatch = {
  userData,
};

SignIn.propTypes = {
  userData: PropTypes.func.isRequired,
};

export default connect(null, mapDispatch)(SignIn);
