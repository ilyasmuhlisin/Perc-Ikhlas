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

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { logout } from "../../../redux/actions/userActions";
import { useDispatch } from "react-redux";

function OrderDetailsScreenComponent({
  getOrder,
  markAsProcess,
  markAsPaid,
}) {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paidButton, setPaidButton] = useState("Tandai lunas");
  const [isPaid, setIsPaid] = useState(false);
  const [isProcess, setIsProcess] = useState(false);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [orderButtonMessage, setOrderButtonMessage] =
    useState("Tandai diproses");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getOrder(id)
      .then((order) => {
        setUserInfo(order.user);
        setPaymentMethod(order.paymentMethod);
        // order.isPaid ? setIsPaid(order.paidAt) : setIsPaid(false);
        order.isPaid ? setIsPaid(order.paidAt) : setIsPaid(false);
        order.isProcess
          ? setIsProcess(order.processAt)
          : setIsProcess(false);
        setCartSubtotal(order.orderTotal.cartSubtotal);
        if (order.isProcess & order.isPaid) {
          setPaidButton("Sudah lunas");
          setOrderButtonMessage("Diproses");
          setButtonDisabled(true);
        }
        // if (order.isPaid) {
        //   setPaidButton("Paid is finished");
        //   setButtonDisabled(true);
        // }
        setCartItems(order.cartItems);
      })
      .catch(
        (er) => dispatch(logout())
        // console.log(
        //   er.response.data.message ? er.response.data.message : er.response.data
        // )
      );
    // halaman otomatis berubah ketika perubahan dilakukan
  }, [isPaid, isProcess, id]);
  return (
    <Container fluid>
      <Row className="mt-4">
        <h1>Order Details</h1>
        <Col md={8}>
          <br />
          <Row>
            <Col md={6}>
              <h2>Shipping</h2>
              <b>Name</b>: {userInfo.name} {userInfo.lastName} <br />
              <b>Address</b>: {userInfo.address} {userInfo.city}{" "}
              {userInfo.state} {userInfo.zipCode} <br />
              <b>Phone</b>: {userInfo.phoneNumber}
            </Col>
            <Col md={6}>
              <h2>Payment method</h2>
              <Form.Select value={paymentMethod} disabled={false}>
                <option value="dikirim">Dikirim</option>
                <option value="diambil">Diambil</option>
              </Form.Select>
            </Col>
            <Row>
              <Col>
                <Alert
                  className="mt-3"
                  variant={isProcess ? "success" : "danger"}
                >
                  {isProcess ? (
                    <>Diproses {isProcess}</>
                  ) : (
                    <>Belum diproses</>
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
            {/* {Array.from({ length: 3 }).map((item, idx) => (
              <CartItemComponent key={idx} />
            ))} */}
            {cartItems.map((item, idx) => (
              <CartItemComponent key={idx} item={item} orderCreated={true} />
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>Order summary</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Items price: <span className="fw-bold">Rp {cartSubtotal}</span>
            </ListGroup.Item>
            {/* <ListGroup.Item>
              Shipping: <span className="fw-bold">included</span>
            </ListGroup.Item> */}
            {/* <ListGroup.Item>
              Tax: <span className="fw-bold">included</span>
            </ListGroup.Item> */}
            <ListGroup.Item className="text-danger">
              Total price: <span className="fw-bold">Rp {cartSubtotal}</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid gap-2">
                <Button
                  size="lg"
                  variant="success"
                  onClick={() =>
                    markAsPaid(id)
                      .then((res) => {
                        if (res) {
                          setIsPaid(true);
                        }
                      })
                      .catch((er) =>
                        console.log(
                          er.response.data.message
                            ? er.response.data.message
                            : er.response.data
                        )
                      )
                  }
                  disabled={buttonDisabled}
                  type="button"
                >
                  {paidButton}
                </Button>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid gap-2">
                <Button
                  size="lg"
                  variant="danger"
                  onClick={() =>
                    markAsProcess(id)
                      .then((res) => {
                        if (res) {
                          setIsProcess(true);
                        }
                      })
                      .catch((er) =>
                        console.log(
                          er.response.data.message
                            ? er.response.data.message
                            : er.response.data
                        )
                      )
                  }
                  disabled={buttonDisabled}
                  type="button"
                >
                  {orderButtonMessage}
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default OrderDetailsScreenComponent;
