import { useLoaderData, Link, redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { checkProtected } from "../components/auth";
import { getUserDetails, getFollowDetails } from "../middleware/loaderUtils";

export async function profileLoader({ request, params }) {
  const userID = params.userID;
  const { isProtected, redirectURL } = checkProtected(request);
  if (!isProtected) {
    return redirect(redirectURL);
  }
  const { userData } = await getUserDetails(userID);
  // if the following is invalid, there isn't a matching username in the db
  const { followDetails } = await getFollowDetails(userID);
  return { userData, followDetails };
}
export default function Profile() {
  const { userData, followDetails } = useLoaderData();
  const numFollowers = followDetails.followers.length;
  const numFollowing = followDetails.following.length;

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
            <h3>{userData.username}</h3>
          </Row>
          <Row sm="auto">
            <h5>
              {"Followers: "}
              {numFollowers > 0 ? (
                <Link to="/followers" className="custom-link">
                  {numFollowers}
                </Link>
              ) : (
                { numFollowers }
              )}
            </h5>
          </Row>
          <Row sm="auto">
            <h5>
              {"Following: "}
              {numFollowing > 0 ? (
                <Link to="/following" className="custom-link">
                  {numFollowing}
                </Link>
              ) : (
                { numFollowing }
              )}
            </h5>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
