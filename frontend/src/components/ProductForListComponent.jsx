import { Card, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

// {images,idx}
const ProductForListComponent = ({
  productId,
  name,
  description,
  price,
  images,
}) => {
  return (
    <Card style={{ marginTop: "30px", marginBottom: "50px" }}>
      <Row>
        <Col lg={5}>
          <Card.Img
            variant="top"
            src={images[0] ? images[0].path : ""}
            // src={"/images/" + images[idx] + "-category.png"}
          />
        </Col>
        <Col lg={7}>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Card.Text className="h4">
              Rp.{price}{" "}
              <LinkContainer to={`/product-details/${productId}`}>
                <Button variant="danger">See product</Button>
              </LinkContainer>
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductForListComponent;
