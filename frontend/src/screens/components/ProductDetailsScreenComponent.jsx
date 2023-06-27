import React, { useRef } from "react";
import {
  Row,
  Col,
  Container,
  Image,
  ListGroup,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import AddedToCartMessageComponent from "../../components/AddedToCartMessageComponent";

import ImageZoom from "js-image-zoom";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

// { addToCartHandler, products }
function ProductDetailsScreenComponent({
  addToCartReduxAction,
  reduxDispatch,
  getProductDetails,
  userInfo,
  writeReviewApiRequest,
}) {
  // const { id } = useParams();
  // console.log(id);

  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [productReviewed, setProductReviewed] = useState(false);

  const messagesEndRef = useRef(null);

  const addToCartHandler = () => {
    reduxDispatch(addToCartReduxAction(id, quantity));
    setShowCartMessage(true);
  };

  useEffect(() => {
    if (productReviewed) {
      setTimeout(() => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  }, [productReviewed]);

  // var options = {
  //   // width: 400,
  //   // zoomWidth: 500,
  //   // fillContainer: true,
  //   // zoomPosition: "bottom",
  //   scale: 2,
  //   offset: { vertical: 0, horizontal: 0 },
  // };
  // useEffect(() => {
  //   new ImageZoom(document.getElementById("first"), options);
  //   new ImageZoom(document.getElementById("second"), options);
  //   new ImageZoom(document.getElementById("third"), options);
  //   new ImageZoom(document.getElementById("fourth"), options);
  // });

  useEffect(() => {
    if (product.images) {
      var options = {
        // width: 400,
        // zoomWidth: 500,
        // fillContainer: true,
        // zoomPosition: "bottom",
        scale: 2,
        offset: { vertical: 0, horizontal: 0 },
      };

      product.images.map(
        (image, id) =>
          new ImageZoom(document.getElementById(`imageId${id + 1}`), options)
      );
    }
  });

  useEffect(() => {
    getProductDetails(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((er) =>
        setError(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, [id, productReviewed]);

  const sendReviewHandler = (e) => {
    e.preventDefault();
    const form = e.currentTarget.elements;
    const formInputs = {
      comment: form.comment.value,
      // rating: form.rating.value,
    };
    if (e.currentTarget.checkValidity() === true) {
      // console.log(product._id, formInputs);
      writeReviewApiRequest(product._id, formInputs)
        .then((data) => {
          if (data === "review created") {
            setProductReviewed("You successfuly reviewed the page!");
          }
        })
        .catch((er) =>
          setProductReviewed(
            er.response.data.message
              ? er.response.data.message
              : er.response.data
          )
        );
    }
  };

  return (
    <Container>
      <AddedToCartMessageComponent
        showCartMessage={showCartMessage}
        setShowCartMessage={setShowCartMessage}
      />
      <Row className="mt-5">
        {loading ? (
          <h2>Loading product details ...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <>
            <Col style={{ zIndex: 1 }} md={4}>
              {/* <div id="first">
                <Image
                  crossOrigin="anonymous"
                  fluid
                  src="/images/games-category.png"
                />
              </div> */}
              {product.images
                ? product.images.map((image, id) => (
                    <div key={id}>
                      <div key={id} id={`imageId${id + 1}`}>
                        <Image
                          crossOrigin="anonymous"
                          fluid
                          src={`${image.path ?? null}`}
                        />
                      </div>
                      <br />
                    </div>
                  ))
                : null}
            </Col>
            <Col md={8}>
              <Row>
                <Col md={8}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h1>{product.name}</h1>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Price <span className="fw-bold">Rp.{product.price}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>{product.description}</ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={4}>
                  <ListGroup>
                    <ListGroup.Item>
                      Status: {product.count > 0 ? "in stock" : "out of stock"}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Price <span className="fw-bold">Rp.{product.price}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Quantity:
                      <Form.Group className="mb-3" controlId="formBasicCount">
                        <Form.Control
                          name="count"
                          required
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                        {/* {[...Array(product.count).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))} */}
                      </Form.Group>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button onClick={addToCartHandler} variant="danger">
                        Add to cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
              <Row>
                <Col className="mt-5">
                  <h5>REVIEWS</h5>
                  <ListGroup variant="flush">
                    {product.reviews &&
                      product.reviews.map((review, idx) => (
                        <ListGroup.Item key={idx}>
                          {review.user.name} <br />
                          {review.createdAt.substring(0, 10)} <br />
                          {review.comment}
                        </ListGroup.Item>
                      ))}
                    {/* {Array.from({ length: 10 }).map((item, idx) => (
                      <ListGroup.Item key={idx}>
                        John Doe <br />
                        <br />
                        20-09-2001 <br />
                        Porta ac consectetur ac Lorem ipsum dolor, sit amet
                        consectetur adipisicing elit. Perferendis, illo.
                      </ListGroup.Item>
                    ))} */}
                    <div ref={messagesEndRef} />
                  </ListGroup>
                </Col>
              </Row>
              <hr />
              {!userInfo.name && (
                <Alert variant="danger">Login first to write a review</Alert>
              )}
              <Form onSubmit={sendReviewHandler}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Write a review</Form.Label>
                  <Form.Control
                    name="comment"
                    required
                    as="textarea"
                    disabled={!userInfo.name}
                    rows={3}
                  />
                </Form.Group>
                <Button
                  disabled={!userInfo.name}
                  type="submit"
                  className="mb-3 mt-3"
                  variant="primary"
                  style={{ marginRight: "5px" }}
                >
                  Submit
                </Button>
                {productReviewed}
              </Form>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
}

export default ProductDetailsScreenComponent;
