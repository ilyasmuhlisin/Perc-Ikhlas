import React from "react";
import { Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function CategoryCardComponent({ category, idx }) {
  // const images = [
  //   "/images/tablets-category.png",
  //   "/images/monitors-category.png",
  //   "/images/games-category.png",
  //   "/images/tablets-category.png",
  //   "/images/tablets-category.png",
  //   "/images/tablets-category.png",
  //   "/images/tablets-category.png",
  //   "/images/tablets-category.png",
  // ];
  return (
    <Card>
      {/* {images[idx]} */}
      <Card.Img
        crossOrigin="anonymous"
        variant="top"
        src={category.image ?? null}
      />
      <Card.Body>
        <Card.Title>{category.name}</Card.Title>
        <Card.Text>{category.description}</Card.Text>
        <LinkContainer to={`/product-list/category/${category.name}`}>
          <Button variant="primary">Go to the Category</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
}

export default CategoryCardComponent;
