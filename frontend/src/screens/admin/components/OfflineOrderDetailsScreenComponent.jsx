import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { logout } from "../../../redux/actions/userActions";
import { useDispatch } from "react-redux";

function OfflineOrderDetailsScreenComponent({ getOfflineOrder }) {
  const { id } = useParams();
  const dispatch = useDispatch();

  // const [validated, setValidated] = useState(false);
  // const [date, setDate] = useState(new Date());

  // console.log("DATE", date);
  const [maleName, setMaleName] = useState("");
  const [maleParent, setMaleParent] = useState("");
  const [maleAddress, setMaleAddress] = useState("");
  const [receptionDate, setReceptionDate] = useState("");
  const [receptionPlace, setReceptionPlace] = useState("");
  const [femaleName, setFemaleName] = useState("");
  const [femaleParent, setFemaleParent] = useState("");
  const [femaleAddress, setFemaleAddress] = useState("");
  const [agreementDate, setAgreementDate] = useState("");
  const [agreementPlace, setAgreementPlace] = useState("");

  useEffect(() => {
    getOfflineOrder(id)
      .then((order) => {
        setMaleName(order.maleName);
        setMaleParent(order.maleParent);
        setMaleAddress(order.maleAddress);
        setReceptionDate(order.receptionDate);
        setReceptionPlace(order.receptionPlace);
        setFemaleName(order.femaleName);
        setFemaleParent(order.femaleParent);
        setFemaleAddress(order.femaleAddress);
        setAgreementDate(order.agreementDate);
        setAgreementPlace(order.agreementPlace);
      })
      .catch(
        (er) => dispatch(logout())
        // console.log(
        //   er.response.data.message ? er.response.data.message : er.response.data
        // )
      );
    // halaman otomatis berubah ketika perubahan dilakukan
  }, [id]);

  // const handleSubmit = (event) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }

  //   setValidated(true);
  // };
  return (
    <Container>
      <Form>
        <Row className="mt-5">
          <Col md={1}>
            <Link to="/admin/offline-orders" className="btn btn-info my-3">
              Go Back
            </Link>
          </Col>
          <h1 className="mb-3">Family Data</h1>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label>Nama Pengantin Pria</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={maleName}
                name="maleName"
                readOnly
              />
              <Form.Control.Feedback type="invalid">
                Masukkan nama pengantin pria
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicMaleFamilyName">
              <Form.Label>Nama Orang Tua(Bapak & Ibu) Pria</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={maleParent}
                name="maleFamilyName"
                readOnly
              />
              <Form.Control.Feedback type="invalid">
                Masukkan nama kedua orang tua
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicMaleAddress">
              <Form.Label>Alamat Pria</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={maleAddress}
                name="maleAddress"
                readOnly
              />
              <Form.Control.Feedback type="invalid">
                Masukkan alamat
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="receptionDate">
              <Form.Label>Tanggal Resepsi</Form.Label>
              <Form.Control
                type="date"
                name="receptionDate"
                placeholder={receptionDate}
                value={receptionDate}
                readOnly
                // onChange={(e) => setDate(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Masukkan tanggal
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicReceptionPlace">
              <Form.Label>Alamat Tempat Resepsi</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={receptionPlace}
                name="receptionPlace"
                readOnly
              />
              <Form.Control.Feedback type="invalid">
                Masukkan alamat resepsi
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="validationCustom02">
              <Form.Label>Nama Pengantin Wanita</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={femaleName}
                name="femaleName"
                readOnly
              />
              <Form.Control.Feedback type="invalid">
                Masukkan nama pengantin wanita
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicFemaleFamilyName">
              <Form.Label>Nama Orang Tua(Bapak & Ibu) Wanita</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={femaleParent}
                name="femaleFamilyName"
                readOnly
              />
              <Form.Control.Feedback type="invalid">
                Masukkan nama kedua orang tua
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicFemaleAddress">
              <Form.Label>Alamat Wanita</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={femaleAddress}
                name="femaleAddress"
                readOnly
              />
              <Form.Control.Feedback type="invalid">
                Masukkan alamat
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="agreementDate">
              <Form.Label>Tanggal Akad</Form.Label>
              <Form.Control
                type="date"
                name="agreementDate"
                placeholder="Tanggal akad"
                value={agreementDate}
                readOnly
                // onChange={(e) => setDate(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Masukkan tanggal
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAgreementPlace">
              <Form.Label>Alamat Tempat Akad</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={agreementPlace}
                name="agreementPlace"
                readOnly
              />
              <Form.Control.Feedback type="invalid">
                Masukkan alamat akad
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default OfflineOrderDetailsScreenComponent;
