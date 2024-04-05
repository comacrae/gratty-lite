import { useAuth0 } from "@auth0/auth0-react";
import { useRouteLoaderData } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Axios from "axios";
const axios = Axios.create({ baseURL: "http://localhost:8081/api/" });
export default function Home() {
  let { isAuthenticated } = useAuth0();

  return (
    <Container>
      <h1>Home</h1>
      <p>Logged in:{new String(isAuthenticated)}</p>
    </Container>
  );
}
