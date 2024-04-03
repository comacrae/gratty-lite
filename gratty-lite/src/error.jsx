import { useRouteError } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Container className=" d-flex flex-column justify-content-center align-items-center align-text-center">
      <h1> Oops!</h1>
      <p>Sorry, an unexpected error occured.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </Container>
  );
}
