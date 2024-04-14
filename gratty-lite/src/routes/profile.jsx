import { useLoaderData } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { protectedLoader } from "../components/auth";
import { getUserDetails } from "../components/loaderUtils";

export async function profileLoader({ request }) {
  const username = protectedLoader(request);
  let userData = await getUserDetails(username);
  // if the following is invalid, there isn't a matching username in the db
  if (userData.status === "error") {
    throw Error("Error in getUserDetails");
  } else if (userData.status === "no matching user") {
    throw Error(`There is no username: ${username} in the database`);
  }
  return { userData, username };
}
export default function Profile() {
  const { userData, username } = useLoaderData();

  return (
    <Container fluid>
      <Row>
        <Col sm="auto" className="text-center">
          <Image src="https://picsum.photos/200" thumbnail />
        </Col>
        <Col sm="auto" className="text-center">
          <Row sm="auto">
            <h1>
              {userData.firstName} {userData.lastName}
            </h1>
          </Row>
          <Row sm="auto">
            <h2>{username}</h2>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
