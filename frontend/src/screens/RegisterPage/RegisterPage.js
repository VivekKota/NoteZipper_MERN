import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { register } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [message, setmessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setmessage("passwords doesn't match");
    } else {
      dispatch(register(name, email, password, pic));
    }
  };

  return (
    <MainScreen title="Register">
      <div className="loginContainer">
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPic">
            <Form.Label>Profile Picture</Form.Label>
            <div className="input-group">
              <Form.Control
                type="image/png"
                placeholder="Upload Profile Picture"
                value={pic}
                onChange={(e) => setPic(e.target.value)}
              />
              <Button variant="secondary" id="inputGroupFileAddon04">
                Browse
              </Button>
            </div>
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>

          <Row className="py-3">
            <Col>
              Have an account ? <Link to="/login"> Login</Link>
            </Col>
          </Row>
        </Form>
      </div>
    </MainScreen>
  );
};

export default RegisterPage;
