import { useRouteLoaderData } from "react-router-dom";
import Container from "react-bootstrap/Container";
export default function Home() {
  const { isAuthenticated, userID } = useRouteLoaderData("home");

  return (
    <Container fluid>
      <h1>Home</h1>
      <p>Logged in:{new String(isAuthenticated)}</p>
      <p>ID:{new String(userID)}</p>
    </Container>
  );
}
