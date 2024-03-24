import React from "react";
import "./LandingPage.css";
import { Container, Row, Button } from "react-bootstrap";

const LandingPage = () => {
  return (
    <div className="Main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to Note Zipper</h1>
              <p className="subtitle">one Safe place for all your notes</p>
            </div>
            <div className="buttonContainer">
              <a href="/login">
                <Button size="lg" className="LandingButton">
                  Login
                </Button>
              </a>
              <a href="/Register">
                <Button
                  size="lg"
                  className="LandingButton"
                  variant="outline-primary"
                >
                  Register
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
