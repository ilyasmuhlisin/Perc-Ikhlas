import React from "react";
import { Container, Row, Col, Alert, ListGroup, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import CartItemComponent from "../../components/CartItemComponent";

function CartScreenComponent({
  addToCart,
  removeFromCart,
  cartItems,
  cartSubtotal,
  reduxDispatch,
}) {
  // console.log(cartItems);
  const changeCount = (productID, count) => {
    reduxDispatch(addToCart(productID, count));
  };

  const removeFromCartHandler = (productID, quantity, price) => {
    if (window.confirm("Are you sure?")) {
      // console.log(productID);
      // console.log(quantity);
      // console.log(price);
      reduxDispatch(removeFromCart(productID, quantity, price));
    }
  };

  return (
    <Container fluid>
      <Row className="mt-4">
        <Col md={8}>
          <h1>Shopping Cart</h1>
          <ListGroup variant="flush">
            {/* {Array.from({ length: 3 }).map((item, idx) => (
              <CartItemComponent
                item={{
                  image: { path: "/images/tablets-category.png" },
                  name: "Product name",
                  price: 10,
                  count: 10,
                  quantity: 10,
                }}
                key={idx}
              />
            ))} */}
            {cartItems.length === 0 ? (
              <Alert variant="info">Your cart is empty</Alert>
            ) : (
              <ListGroup variant="flush">
                {cartItems.map((item, idx) => (
                  <CartItemComponent
                    item={item}
                    key={idx}
                    changeCount={changeCount}
                    removeFromCartHandler={removeFromCartHandler}
                  />
                ))}
              </ListGroup>
            )}
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>
                Subtotal ({cartItems.length}{" "}
                {cartItems.length === 1 ? "Product" : "Products"})
              </h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Price: <span className="fw-bold">Rp.{cartSubtotal}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <LinkContainer to="/user/cart-details">
                <Button disabled={cartSubtotal === 0} type="button">
                  Proceed To Checkout
                </Button>
              </LinkContainer>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default CartScreenComponent;
