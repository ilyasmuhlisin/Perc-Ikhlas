import { Form } from "react-bootstrap";

const CategoryFilterComponent = () => {
  return (
    <>
      <span className="fw-bold">Category</span>
      <Form>
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx}>
            {/* check-api2 dapat input checkbox di halaman yang sama */}
            <Form.Check type="checkbox" id={`check-api2-${idx}`}>
              <Form.Check.Input type="checkbox" isValid />
              <Form.Check.Label style={{ cursor: "pointer" }}>
                Category-{idx}
              </Form.Check.Label>
            </Form.Check>
          </div>
        ))}
      </Form>
    </>
  );
};

export default CategoryFilterComponent;
