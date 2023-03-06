import React from 'react'
import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from "react-router-dom";
import AdminLinksComponent from '../../../components/admin/AdminLinksComponent';

function OfflineOrdersScreenComponent() {

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
             <th>Detail</th>
           </tr>
         </thead>
         <tbody>
           {["bi bi-check-lg text-success", "bi bi-x-lg text-danger"].map(
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
           )}
         </tbody>
       </Table>
     </Col>
   </Row>
 );
}

export default OfflineOrdersScreenComponent