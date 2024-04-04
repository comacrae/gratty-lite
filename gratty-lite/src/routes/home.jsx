import { useRouteLoaderData } from "react-router-dom";
import Container from "react-bootstrap/Container";

export default function Home() {
  let { username, isAuthenticated } = useRouteLoaderData("root");
  return (
    <Container>
      <h1>Home</h1>
      <p>{new String(isAuthenticated)}</p>
    </Container>
  );
}
