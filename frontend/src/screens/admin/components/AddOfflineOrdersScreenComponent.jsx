import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link } from 'react-router-dom';

function AddOfflineOrdersScreenComponent() {
 const [validated, setValidated] = useState(false);
 const [date, setDate] = useState(new Date());

 console.log("DATE", date);

 const onChange = () => {
   const password = document.querySelector("input[name=password]");
   const confirm = document.querySelector("input[name=confirmPassword]");
   if (confirm.value === password.value) {
     confirm.setCustomValidity("");
   } else {
     confirm.setCustomValidity("Passwords do not match");
   }
 };

 const handleSubmit = (event) => {
   const form = event.currentTarget;
   if (form.checkValidity() === false) {
     event.preventDefault();
     event.stopPropagation();
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
               name="maleFamilyName"
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
               // value={date}
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
               name="femaleFamilyName"
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
               // value={date}
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
               defaultValue="jl. durian, dusun, desa"
               name="agreementPlace"
             />
             <Form.Control.Feedback type="invalid">
               Masukkan alamat akad
             </Form.Control.Feedback>
           </Form.Group>
         </Col>
       </Row>
       <Button className="text-align-center" variant="primary" type="submit">
         Submit
       </Button>
       <Alert show={true} variant="danger">
         User with that email already exists!
       </Alert>
       <Alert show={true} variant="info">
         User updated
       </Alert>
     </Form>
   </Container>
 );
}

export default AddOfflineOrdersScreenComponent