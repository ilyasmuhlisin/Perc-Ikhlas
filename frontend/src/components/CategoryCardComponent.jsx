import React from "react";
import { Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function CategoryCardComponent({ category, idx }) {
  return (
    <Card style={{ width: "18rem", marginLeft: "10px", padding: "0px" }}>
      {/* {images[idx]} */}
      <Card.Img
        crossOrigin="anonymous"
        variant="top"
        style={{ width: "100%" }}
        src={category.image ?? null}
      />
      <Card.Body>
        <Card.Title>{category.name}</Card.Title>
        <Card.Text>{category.description}</Card.Text>
        <LinkContainer to={`/product-list/category/${category.name}`}>
          <Button variant="primary">Lihat Kategori</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
}

export default CategoryCardComponent;
