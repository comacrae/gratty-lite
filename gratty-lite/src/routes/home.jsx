import Container from "react-bootstrap/Container";
import { getAuthDetails } from "../components/auth";
export default function Home() {
  const { isAuthenticated, userID } = getAuthDetails();

  return (
    <Container fluid>
      <h1>Home</h1>
      <p>Logged in:{new String(isAuthenticated)}</p>
      <p>ID:{new String(userID)}</p>
    </Container>
  );
}
