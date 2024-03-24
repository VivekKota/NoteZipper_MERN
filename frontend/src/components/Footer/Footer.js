import React from "react";
import { Container, Col, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="text-center py-3">
          <Col>Copyright @ Note Zipper</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
