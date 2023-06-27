import React from "react";
import { Row, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function HeadingSectionComponent() {
  return (
    <div className="bg-dark">
      <Container>
        <Row xs={1} md={2} className="g-4 pt-5">
          <div className="fw-bold text-warning fs-1 pt-5">
            Time To Give The Best Wedding Invitation Card
            <div>
              <p className="text-white fw-normal fs-5">
                Berikan sebuah pesan kecil dengan makna besar, rayakan momen
                membahagiakan bersama teman - teman.
              </p>
            </div>
            <LinkContainer to="/product-list/">
              <Button variant="primary">Explore</Button>
            </LinkContainer>
          </div>
          <div className="">
            <img
              className="d-block w-90 ms-5 ps-5"
              style={{ height: "400px", objectFit: "cover" }}
              src="/images/headerimg.png"
              alt="Second slide"
            />
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default HeadingSectionComponent;
