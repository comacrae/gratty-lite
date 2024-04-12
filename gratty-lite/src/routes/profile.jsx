import { useLoaderData } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { protectedLoader } from "../components/auth";
import { getUserDetails } from "../components/loaderUtils";

export async function profileLoader({ request }) {
  const username = protectedLoader(request);
  let userData = await getUserDetails(username);
  // if the following is invalid, there isn't a matching username in the db
  if (userData != null && userData.length > 0) {
    userData = userData[0];
  } else {
    userData = null;
  }
  return userData;
}
export default function Profile() {
  const userData = useLoaderData();
  if (!userData) {
    throw Error(
      "There is no username in the database for the user currently logged in"
    );
  }

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <p>Welcome, {userData.firstName}</p>
        </Col>
      </Row>
    </Container>
  );
}
