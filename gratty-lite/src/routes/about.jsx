import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GrattyNavbar from "../components/navbar";

export default function About() {
  return (
    <Container>
      <GrattyNavbar />
      <Row className="d-flex justify-content-center">
        <Col>
          <h1>Gratitude simplified.</h1>
        </Col>
      </Row>
    </Container>
  );
}
