import { Form } from "react-bootstrap";

const PriceFilterComponent = () => {
  return (
    <>
      <Form.Label>
        <span className="fw-bold">Price no greater than:</span> Rp.500
      </Form.Label>
      <Form.Range min={500} max={5000} step={100} />
    </>
  );
};

export default PriceFilterComponent;
