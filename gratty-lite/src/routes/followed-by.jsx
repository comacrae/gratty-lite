import { useLoaderData, Link, redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { getFollowDetails } from "../middleware/loaderUtils";
import { checkProtected } from "../components/auth";
import Row from "react-bootstrap/Row";

export async function followedByLoader({ request, params }) {
  const userID = params.userID;
  const { isProtected, redirectURL } = checkProtected(request);
  if (!isProtected) {
    return redirect(redirectURL);
  }
  const details = await getFollowDetails(userID);
  if (details.status != "success") {
    return null;
  } else {
    return details.followDetails.followers;
  }
}
export default function FollowedByList() {
  const followingList = useLoaderData();

  return (
    <Container>
      {followingList.map((follower, idx) => {
        return (
          <Row key={idx}>
            <Link to={`/profile/${follower.follow_id}`}>
              <p>{follower.username}</p>
            </Link>
          </Row>
        );
      })}
    </Container>
  );
}
