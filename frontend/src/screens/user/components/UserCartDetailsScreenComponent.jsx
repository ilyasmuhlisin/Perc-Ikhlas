import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Alert,
  ListGroup,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CartItemComponent from "../../../components/CartItemComponent";

function UserCartDetailsScreenComponent({
  cartItems,
  itemsCount,
  cartSubtotal,
  userInfo,
  addToCart,
  removeFromCart,
  reduxDispatch,
  getUser,
  createOrder,
}) {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [userAddress, setUserAddress] = useState(false);
  const [missingAddress, setMissingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("dikirim");

  const navigate = useNavigate();

  const changeCount = (productID, count) => {
    reduxDispatch(addToCart(productID, count));
  };

  const removeFromCartHandler = (productID, quantity, price) => {
    if (window.confirm("Are you sure?")) {
      reduxDispatch(removeFromCart(productID, quantity, price));
    }
  };

  // getUser().then((res) => console.log(res));

  useEffect(() => {
    getUser()
      .then((data) => {
        console.log(data.address);
        if (!data.address || !data.city || !data.country || !data.phoneNumber) {
          setButtonDisabled(true);
          setMissingAddress(" .Lengkapi data diri profile terlebih dahulu");
        } else {
          setUserAddress({
            address: data.address,
            city: data.city,
            country: data.country,
            zipCode: data.zipCode,
            state: data.state,
            phoneNumber: data.phoneNumber,
          });
          setMissingAddress(false);
        }
      })
      .catch((er) =>
        console.log(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, [userInfo._id]);

  const orderHandler = () => {
    const orderData = {
      orderTotal: {
        itemsCount: itemsCount,
        cartSubtotal: cartSubtotal,
      },
      cartItems: cartItems.map((item) => {
        return {
          productID: item.productID,
          name: item.name,
          price: item.price,
          image: { path: item.image ? item.image.path ?? null : null },
          quantity: item.quantity,
          count: item.count,
        };
      }),
      paymentMethod: paymentMethod,
    };
    // console.log(orderData);
    createOrder(orderData).then((data) => {
      if (data) {
        navigate("/user/order-details/" + data._id);
      }
    });
  };

  const choosePayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <Container fluid>
      <Row className="mt-4">
        <h1>Cart Details</h1>
        <Col md={8}>
          <br />
          <Row>
            <Col md={6}>
              <h2>Shipping</h2>
              <b>Name</b>: {userInfo.name} {userInfo.lastName} <br />
              <b>Address</b>: {userAddress.address} {userAddress.city}{" "}
              {userAddress.state} {userAddress.zipCode} <br />
              <b>Phone</b>: {userAddress.phoneNumber}
            </Col>
            <Col md={6}>
              <h2>Payment method</h2>
              <Form.Select onChange={choosePayment}>
                <option value="dikirim">Dikirim</option>
                <option value="diambil">Diambil</option>
              </Form.Select>
            </Col>
            <Row>
              <Col>
                <Alert className="mt-3" variant="danger">
                  Belum dapat diproses {missingAddress}
                </Alert>
              </Col>
              <Col>
                <Alert className="mt-3" variant="danger">
                  Belum lunas
                </Alert>
              </Col>
            </Row>
          </Row>
          <br />
          <h2>Order items</h2>
          <ListGroup variant="flush">
            {cartItems.map((item, idx) => (
              <CartItemComponent
                item={item}
                key={idx}
                removeFromCartHandler={removeFromCartHandler}
                changeCount={changeCount}
              />
            ))}
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
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>Order summary</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Items price: <span className="fw-bold">Rp.{cartSubtotal}</span>
            </ListGroup.Item>
            {/* <ListGroup.Item>
              Shipping: <span className="fw-bold">included</span>
            </ListGroup.Item> */}
            {/* <ListGroup.Item>
              Tax: <span className="fw-bold">included</span>
            </ListGroup.Item> */}
            <ListGroup.Item className="text-danger">
              Total price: <span className="fw-bold">Rp.{cartSubtotal}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid gap-2">
                <Button
                  size="lg"
                  variant="danger"
                  type="button"
                  onClick={orderHandler}
                  disabled={buttonDisabled}
                >
                  Order now
                </Button>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div style={{ paddingBottom: "5px" }}>
                No. Rekening BRI:{" "}
                <span className="fw-bold">695701006143508</span> <br />
                Atas Nama: <span className="fw-bold">Suratno</span>
              </div>
              <Alert show={true} variant="warning">
                - Proses akan dilakukan apabila sudah melakukan pembayaran 50%{" "}
                <br />- Status proses akan berubah setelah dikonfirmasi admin{" "}
                <br />- Lakukan pesanan untuk melihat apakah status sudah
                berubah
              </Alert>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default UserCartDetailsScreenComponent;
