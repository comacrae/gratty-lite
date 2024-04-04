import { useRouteLoaderData } from "react-router-dom";
import Container from "react-bootstrap/Container";

export default function Home() {
  let { username, isAuthenticated } = useRouteLoaderData("root");
  return (
    <Container>
      <h1>Home</h1>
      <p>Logged in:{new String(isAuthenticated)}</p>
    </Container>
  );
}
