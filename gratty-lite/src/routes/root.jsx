import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GrattyNavbar from "../components/navbar";

export default function Root() {
  return (
    <Container>
      <GrattyNavbar />
      <div>Bing Bong</div>
    </Container>
  );
}
