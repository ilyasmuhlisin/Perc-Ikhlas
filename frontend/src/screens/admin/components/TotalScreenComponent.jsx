import React from "react";
import { Card, Row, Col } from "react-bootstrap";

import { useEffect, useState } from "react";

import { logout } from "../../../redux/actions/userActions";
import { useDispatch } from "react-redux";

function TotalScreenComponent({ getOrders }) {
  const dispatch = useDispatch();

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getOrders()
      .then((orders) => setOrders(orders))
      .catch(
        (er) => dispatch(logout())
        // console.log(
        //   er.response.data.message ? er.response.data.message : er.response.data
        // )
      );
  }, []);

  const total = orders.reduce(
    (acc, current) => acc + current.orderTotal.cartSubtotal,
    0
  );

  // Fungsi untuk menghitung total pendapatan bulan ini
  const getTotalRevenueThisMonth = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const totalRevenue = orders.reduce((acc, order) => {
      const date = new Date(order.createdAt);
      const orderYear = date.getFullYear();
      const orderMonth = date.getMonth() + 1;

      if (orderYear === currentYear && orderMonth === currentMonth) {
        acc += order.orderTotal.cartSubtotal;
      }

      return acc;
    }, 0);

    return totalRevenue;
  };

  const totalRevenueThisMonth = getTotalRevenueThisMonth();

  return (
    <Row className="m-5">
      <Col md={2}></Col>
      <Col md={10} className="d-flex justify-content-between">
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Total Order</Card.Title>
              <Card.Text>
                <i class="bi bi-cart-check"></i> {orders.length}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Total Revenue</Card.Title>
              <Card.Text>
                <i class="bi bi-cash-stack"></i>
                {`Rp ${total}`}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card>
            <Card.Body>
              <Card.Title>Total Revenue This Month</Card.Title>
              <Card.Text>
                <i class="bi bi-cash"></i>
                {`Rp ${totalRevenueThisMonth}`}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Col>
    </Row>
  );
}

export default TotalScreenComponent;
