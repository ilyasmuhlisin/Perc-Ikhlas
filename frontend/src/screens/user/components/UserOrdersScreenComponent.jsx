import React, { useEffect, useState } from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const UserOrdersScreenComponent = ({ getOrders }) => {
  // getOrders().then((orders) => console.log(orders));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders()
      .then((orders) => setOrders(orders))
      .catch((er) => console.log(er));
  }, []);
  return (
    <Row className="m-5">
      <Col md={12}>
        <h1>My Orders</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Process</th>
              <th>Order details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>You</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>Rp.{order.orderTotal.cartSubtotal}</td>
                <td>
                  {order.isDelivered ? (
                    <i className="bi bi-check-lg text-success"></i>
                  ) : (
                    <i className="bi bi-x-lg text-danger"></i>
                  )}
                </td>
                <td>
                  <Link to={`/user/order-details/${order._id}`}>
                    <Button className="btn-sm">Order details</Button>
                  </Link>
                </td>
              </tr>
            ))}
            {/* {["bi bi-check-lg text-success", "bi bi-x-lg text-danger"].map(
              (item, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>Mark Twain</td>
                  <td>2022-09-12</td>
                  <td>$124</td>
                  <td>
                    <i className={item}></i>
                  </td>
                  <td>
                    <Link to="/user/order-details">go to order</Link>
                  </td>
                </tr>
              )
            )} */}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default UserOrdersScreenComponent;
