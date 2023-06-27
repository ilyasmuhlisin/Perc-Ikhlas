import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function AddOfflineOrdersScreenComponent({ createOfflineOrdersApiRequest }) {
  const [validated, setValidated] = useState(false);
  const [isCreating, setIsCreating] = useState("");
  const [
    createOfflineOrdersResponseState,
    setCreateOfflineOrdersResponseState,
  ] = useState({
    message: "",
    error: "",
  });
  const [receptionDate, setReceptionDate] = useState(new Date());
  const [agreementDate, setAgreementDate] = useState(new Date());

  //  console.log("DATE", date);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const formxInputs = {
      maleName: form.maleName.value,
      maleParent: form.maleParent.value,
      maleAddress: form.maleAddress.value,
      receptionDate: form.receptionDate.value,
      receptionPlace: form.receptionPlace.value,
      femaleName: form.femaleName.value,
      femaleParent: form.femaleParent.value,
      femaleAddress: form.femaleAddress.value,
      agreementDate: form.agreementDate.value,
      agreementPlace: form.agreementPlace.value,
    };
    if (event.currentTarget.checkValidity() === true) {
      createOfflineOrdersApiRequest(formxInputs)
        .then((data) => {
          console.log(data);
          if (data.message === "offline orders created")
            navigate("/admin/offline-orders");
        })
        .catch((er) => {
          console.log(
            er.response.data.message
              ? er.response.data.message
              : er.response.data
          );
          setCreateOfflineOrdersResponseState({
            error: er.response.data.message
              ? er.response.data.message
              : er.response.data,
          });
        });
    }

    setValidated(true);
  };
  return (
    <Container>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                defaultValue="Dimas"
                name="maleName"
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
                defaultValue="Sumarno & Ningsih"
                name="maleParent"
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
                defaultValue="jl. durian, dusun, desa"
                name="maleAddress"
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
                placeholder="Tanggal resepsi"
                value={receptionDate}
                onChange={(e) => setReceptionDate(e.target.value)}
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
                defaultValue="jl. durian, dusun, desa"
                name="receptionPlace"
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
                defaultValue="annggi"
                name="femaleName"
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
                defaultValue="Sumarno & Ningsih"
                name="femaleParent"
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
                defaultValue="jl. durian, dusun, desa"
                name="femaleAddress"
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
                onChange={(e) => setAgreementDate(e.target.value)}
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
                defaultValue="jl. durian, dusun, desa"
                name="agreementPlace"
              />
              <Form.Control.Feedback type="invalid">
                Masukkan alamat akad
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        {createOfflineOrdersResponseState.error ?? ""}
      </Form>
    </Container>
  );
}

export default AddOfflineOrdersScreenComponent;
