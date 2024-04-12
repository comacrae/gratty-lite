import { Outlet, useRouteLoaderData } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GrattyNavbar from "../components/navbar";

export default function Root() {
  const isAuthenticated = useRouteLoaderData("root");
  return (
    <Container fluid>
      <GrattyNavbar isAuthenticated={isAuthenticated} />
      <Outlet />
    </Container>
  );
}
