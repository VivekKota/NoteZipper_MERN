import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MainScreen from "../../components/MainScreen";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../actions/userActions";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  const id = userInfo._id;
  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ id, name, email, password, pic }));
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [navigate, userInfo]);

  return (
    <MainScreen title="Edit Profile">
      <div className="loginContainer">
        {success && (
          <ErrorMessage variant="success">Updated Successfully</ErrorMessage>
        )}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={updateHandler}>
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
            Update
          </Button>
        </Form>
      </div>
    </MainScreen>
  );
};

export default ProfilePage;
