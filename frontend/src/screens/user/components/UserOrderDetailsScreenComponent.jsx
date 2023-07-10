import {
  Container,
  Row,
  Col,
  Form,
  Alert,
  ListGroup,
  Button,
} from "react-bootstrap";
import CartItemComponent from "../../../components/CartItemComponent";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const UserOrderDetailsScreenComponent = ({ userInfo, getUser, getOrder }) => {
  const [userAddress, setUserAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [orderButtonMessage, setOrderButtonMessage] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [isDelivered, setIsDelivered] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    getUser()
      .then((data) => {
        setUserAddress({
          address: data.address,
          city: data.city,
          country: data.country,
          zipCode: data.zipCode,
          state: data.state,
          phoneNumber: data.phoneNumber,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getOrder(id)
      .then((data) => {
        setPaymentMethod(data.paymentMethod);
        setCartItems(data.cartItems);
        setCartSubtotal(data.orderTotal.cartSubtotal);
        data.isDelivered
          ? setIsDelivered(data.deliveredAt)
          : setIsDelivered(false);
        data.isPaid ? setIsPaid(data.paidAt) : setIsPaid(false);
        if (data.isPaid) {
          setOrderButtonMessage("Pesanan sudah lunas");
          setButtonDisabled(true);
        } else {
          if (data.paymentMethod === "dikirim") {
            setOrderButtonMessage("Pelunasan Bisa Ditempat");
            setButtonDisabled(true);
          } else if (data.paymentMethod === "diambil") {
            setButtonDisabled(true);
            setOrderButtonMessage("Pelunasan Bisa Ditempat");
          }
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container fluid>
      <Row className="mt-4">
        <h1>Order Details</h1>
        <Col md={8}>
          <br />
          <Row>
            <Col md={6}>
              <h2>User Data</h2>
              <b>Name</b>: {userInfo.name} {userInfo.lastName} <br />
              <b>Address</b>: {userAddress.address} {userAddress.city}{" "}
              {userAddress.state} {userAddress.zipCode} <br />
              <b>Phone</b>: {userAddress.phoneNumber}
            </Col>
            <Col md={6}>
              <h2>Picking method</h2>
              <Form.Select value={paymentMethod} disabled={true}>
                <option value="dikirim">Dikirim</option>
                <option value="diambil">Diambil</option>
              </Form.Select>
            </Col>
            <Row>
              <Col>
                <Alert
                  className="mt-3"
                  variant={isDelivered ? "success" : "danger"}
                >
                  {isDelivered ? (
                    <>Diproses {isDelivered}</>
                  ) : (
                    <>Belum diproses, tunggu konfirmasi</>
                  )}
                </Alert>
              </Col>
              <Col>
                <Alert className="mt-3" variant={isPaid ? "success" : "danger"}>
                  {isPaid ? <>Lunas {isPaid}</> : <>Belum lunas</>}
                </Alert>
              </Col>
            </Row>
          </Row>
          <br />
          <h2>Order items</h2>
          <ListGroup variant="flush">
            {cartItems.map((item, idx) => (
              <CartItemComponent item={item} key={idx} orderCreated={true} />
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>Order summary</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Items price : <span className="fw-bold">Rp.{cartSubtotal}</span>
            </ListGroup.Item>
            {/* <ListGroup.Item>
              Shipping: <span className="fw-bold">included</span>
            </ListGroup.Item>
            <ListGroup.Item>
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
                  disabled={buttonDisabled}
                >
                  {orderButtonMessage}
                </Button>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to="/user/my-orders">
                <div className="d-grid gap-2">
                  <Button size="lg" variant="primary" type="button">
                    Cek Pesanan
                  </Button>
                </div>
              </Link>
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
                <br />- Status lunas akan berubah setelah dikonfirmasi admin
              </Alert>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default UserOrderDetailsScreenComponent;
