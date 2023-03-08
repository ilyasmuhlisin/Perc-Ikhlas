import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router";

function UserFamilyScreenComponent({
  createUserFamilyApiRequest,
  userInfo,
  getOfflineOrdersDetails,
}) {
  const [validated, setValidated] = useState(false);
  const [createUserFamilyResponseState, setCreateUserFamilyResponseState] =
    useState({
      message: "",
      error: "",
    });

  const [user, setUser] = useState({});
  const [error, setError] = useState(false);
  const [receptionDate, setReceptionDate] = useState(new Date());
  const [agreementDate, setAgreementDate] = useState(new Date());

  // const families = user.families;
  // console.log(user.maleName);
  useEffect(() => {
    getOfflineOrdersDetails(userInfo._id)
      .then((data) => {
        setUser(data.families);
        // setLoading(false);
      })
      .catch((er) =>
        setError(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
  }, [userInfo._id]);

  //  console.log("DATE", date);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;
    const formInputs = {
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
      createUserFamilyApiRequest(userInfo._id, formInputs)
        .then((data) => {
          console.log(data);
          if (data.message === "create user family updated")
            window.location.href = "/";
        })
        .catch((er) => {
          setCreateUserFamilyResponseState({
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
          <h1 className="mb-3">Family Data</h1>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label>Nama Pengantin Pria</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={user.maleName}
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
                defaultValue={user.maleParent}
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
                defaultValue={user.maleAddress}
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
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="validationCustom02">
              <Form.Label>Nama Pengantin Wanita</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={user.femaleName}
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
                defaultValue={user.femaleParent}
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
                defaultValue={user.femaleAddress}
                name="femaleAddress"
              />
              <Form.Control.Feedback type="invalid">
                Masukkan alamat
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAgreementPlace">
              <Form.Label>Alamat Tempat Akad</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={user.agreementPlace}
                name="agreementPlace"
              />
              <Form.Control.Feedback type="invalid">
                Masukkan alamat akad
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicReceptionPlace">
              <Form.Label>Alamat Tempat Resepsi</Form.Label>
              <Form.Control
                required
                type="text"
                defaultValue={user.receptionPlace}
                name="receptionPlace"
              />
              <Form.Control.Feedback type="invalid">
                Masukkan alamat resepsi
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        {createUserFamilyResponseState.error ?? ""}
        {/* <Alert show={true} variant="danger">
          User with that email already exists!
        </Alert>
        <Alert show={true} variant="info">
          User updated
        </Alert> */}
      </Form>
    </Container>
  );
}

export default UserFamilyScreenComponent;
