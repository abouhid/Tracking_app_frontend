import PropTypes from "prop-types";
import { useState } from "react";
import { connect } from "react-redux";
import jwt from "jwt-decode";
import { useHistory } from "react-router-dom";
import { logInUser, saveToken } from "../api-requests";
import { userData } from "../redux/actions";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const LogIn = ({ userData }) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
      saveToken(data.data.auth_token);
      userData({
        isLoggedIn: true,
        userToken: data.data.auth_token,
        userInfo: jwt(data.data.auth_token).name,
        userId: jwt(data.data.auth_token).user_id,
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
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
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
