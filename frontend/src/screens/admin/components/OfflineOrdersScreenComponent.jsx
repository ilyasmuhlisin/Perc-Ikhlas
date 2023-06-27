import React, { useEffect, useState } from "react";
import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import AdminLinksComponent from "../../../components/admin/AdminLinksComponent";

import { logout } from "../../../redux/actions/userActions";
import { useDispatch } from "react-redux";

function OfflineOrdersScreenComponent({ fetchOfflineOrders }) {
  const dispatch = useDispatch();

  const [offlineOrders, setOfflineOrders] = useState([]);

  useEffect(() => {
    // const abctrl = new AbortController();
    fetchOfflineOrders()
      .then((res) => setOfflineOrders(res))
      .catch(
        (er) => dispatch(logout())
        // menampilkan error di halaman
        // setProducts([
        //   {
        //     name: er.response.data.message
        //       ? er.response.data.message
        //       : er.response.data,
        //   },
        // ])
        // console.log(
        //   er.response.data.message ? er.response.data.message : er.response.data
        // )
      );
    // return () => abctrl.abort();
  }, []);

  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <h1>
          Offline Orders{" "}
          <LinkContainer to="/admin/add-offline-order">
            <Button variant="primary" size="lg">
              Add new
            </Button>
          </LinkContainer>
        </h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Pengantin Pria</th>
              <th>Pengantin Wanita</th>
              <th>Tanggal Akad</th>
              <th>Tanggal Resepsi</th>
              <th>Tempat Akad</th>
              <th>Tempat Resepsi</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {offlineOrders.map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{item.maleName}</td>
                <td>{item.femaleName}</td>
                <td>{item.agreementDate}</td>
                <td>{item.receptionDate}</td>
                <td>{item.agreementPlace}</td>
                <td>{item.receptionPlace}</td>
                <td>
                  <Link to={`/admin/offline-order-details/${item._id}`}>
                    <Button variant="success" className="btn-sm">
                      Data details
                    </Button>
                  </Link>
                </td>
                {/* <td>
                  <LinkContainer to={`/admin/edit-product/${item._id}`}>
                    <Button className="btn-sm">
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                  </LinkContainer>
                  {" / "}
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(item._id)}
                  >
                    <i className="bi bi-x-circle"></i>
                  </Button>
                </td> */}
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
                  <td>PayPal</td>
                  <td>xxxx</td>
                  <td>
                    <Link to="/admin/offline-order-details">details</Link>
                  </td>
                </tr>
              )
            )} */}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}

export default OfflineOrdersScreenComponent;
