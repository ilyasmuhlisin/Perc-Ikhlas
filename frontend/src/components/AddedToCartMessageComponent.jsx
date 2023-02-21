import { Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddedToCartMessageComponent = ({
  showCartMessage,
  setShowCartMessage,
}) => {
  // const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const goBack = () => {
    // -1 berarti kembali ke halaman sebelumnya
    navigate(-1);
  };
  return (
    <Alert
      show={showCartMessage}
      variant="success"
      onClose={() => setShowCartMessage(false)}
      dismissible
    >
      <Alert.Heading>The product was added to your cart!</Alert.Heading>
      <p>
        <Button variant="success" onClick={goBack}>
          Go back
        </Button>{" "}
        <Link to="/cart">
          <Button variant="danger">Go to cart</Button>
        </Link>
      </p>
    </Alert>
  );
};

export default AddedToCartMessageComponent;
