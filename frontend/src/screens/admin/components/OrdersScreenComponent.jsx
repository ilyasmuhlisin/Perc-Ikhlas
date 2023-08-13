import React from "react";
import { Row, Col, Table, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";

import { useEffect, useState } from "react";

import { logout } from "../../../redux/actions/userActions";
import { useDispatch } from "react-redux";

import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  StyleSheet,
  View,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  entry: {
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
  },
  labelColumn: {
    width: "40%",
  },
  valueColumn: {
    width: "60%",
  },
  label: {
    fontWeight: "bold",
    fontSize: 12,
  },
  value: {
    fontSize: 12,
  },
  separator: {
    borderBottom: "1px solid #000",
    marginTop: 5,
  },
  total: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "right",
  },
});
function OrdersScreenComponent({ getOrders }) {
  const dispatch = useDispatch();

  const [orders, setOrders] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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

  const handleFilter = () => {
    if (!startDate || !endDate) {
      return orders; // Tampilkan semua data jika tanggal belum diisi
    }

    const filteredOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
    });

    return filteredOrders;
  };

  const calculateTotal = () => {
    const filteredOrders = handleFilter();
    return filteredOrders.reduce(
      (total, order) => total + order.orderTotal.cartSubtotal,
      0
    );
  };

  // Fungsi untuk mengunduh data sebagai PDF
  const PDFDocument = ({ orders }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Order List</Text>
        {orders.map((order, index) => (
          <View key={order._id} style={styles.entry}>
            <View style={styles.row}>
              <View style={styles.labelColumn}>
                <Text style={styles.label}>Order ID:</Text>
                <Text style={styles.label}>Customer:</Text>
                <Text style={styles.label}>Total:</Text>
                <Text style={styles.label}>Payment Method:</Text>
                <Text style={styles.label}>Paid:</Text>
                <Text style={styles.label}>Date:</Text>
              </View>
              <View style={styles.valueColumn}>
                <Text style={styles.value}>{order._id}</Text>
                <Text style={styles.value}>
                  {order.user.name} {order.user.lastName}
                </Text>
                <Text style={styles.value}>
                  {order.orderTotal.cartSubtotal}
                </Text>
                <Text style={styles.value}>{order.paymentMethod}</Text>
                <Text style={styles.value}>{order.isPaid ? "Yes" : "No"}</Text>
                <Text style={styles.value}>
                  {new Date(order.createdAt).toLocaleString()}
                </Text>
              </View>
            </View>
            {index !== orders.length - 1 && <View style={styles.separator} />}
          </View>
        ))}
        <Text style={styles.total}>
          Total Pendapatan: {calculateTotal(orders)}
        </Text>
      </Page>
    </Document>
  );

  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <h1>Orders</h1>
        <Form.Group controlId="firstDateToCompare">
          <Form.Label>Select First Date To Compare</Form.Label>
          <Form.Control
            onChange={(e) => setStartDate(e.target.value)}
            type="date"
            name="firstDateToCompare"
            placeholder="First Date To Compare"
          />
        </Form.Group>
        <Form.Group controlId="secondDateToCompare">
          <Form.Label>Select Second Date To Compare</Form.Label>
          <Form.Control
            onChange={(e) => setEndDate(e.target.value)}
            type="date"
            name="secondDateToCompare"
            placeholder="Second Date To Compare"
          />
        </Form.Group>
        <br />
        {/* <div>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div> */}
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Process</th>
              <th>Picking Method</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {handleFilter().map((order, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>
                  {order.user !== null ? (
                    <>
                      {order.user.name} {order.user.lastName}
                    </>
                  ) : null}
                </td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.orderTotal.cartSubtotal}</td>
                <td>
                  {order.isProcess ? (
                    <i className="bi bi-check-lg text-success"></i>
                  ) : (
                    <i className="bi bi-x-lg text-danger"></i>
                  )}
                </td>
                <td>{order.paymentMethod}</td>
                <td>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/admin/order-details/${order._id}`}
                  >
                    <Button className="btn-sm">Order details</Button>
                  </Link>
                  <Link
                    style={{ marginLeft: "5px", textDecoration: "none" }}
                    to={`/admin/family-order-data/${order.user._id}`}
                  >
                    <Button variant="success" className="btn-sm">
                      Data details
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <p className="fw-bold">Total Cart Subtotal: {calculateTotal()}</p>{" "}
        <PDFDownloadLink
          document={<PDFDocument orders={handleFilter(orders)} />}
          fileName="orders.pdf"
        >
          {({ blob, url, loading, error }) => (
            <Button
              variant="warning"
              className="btn-sm"
              style={{ color: "white" }}
            >
              {loading ? "Loading document..." : "Download PDF"}
            </Button>
          )}
        </PDFDownloadLink>
      </Col>
    </Row>
  );
}

export default OrdersScreenComponent;
