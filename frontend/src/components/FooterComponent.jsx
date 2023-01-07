import React from 'react'
import { Container, Row, Col } from "react-bootstrap";

function FooterComponent() {
  return (
    <footer>
      <Container fluid>
        <Row className="mt-5">
          <Col className="bg-dark text-white text-center py-5">
            Copyright &copy; Perc. Ikhlas
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default FooterComponent