import { useLoaderData, Link, redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { getFollowDetails } from "../middleware/loaderUtils";
import { checkProtected } from "../components/auth";
import Row from "react-bootstrap/Row";

export async function followingLoader({ request, params }) {
  const userID = params.userID;
  const { isProtected, redirectURL } = checkProtected(request);
  if (!isProtected) {
    return redirect(redirectURL);
  }
  const details = await getFollowDetails(userID);
  if (details.status != "success") {
    return null;
  } else {
    return details.followDetails.following;
  }
}
export default function FollowingList() {
  const followingList = useLoaderData();

  return (
    <Container>
      {followingList.map((followed, idx) => {
        return (
          <Row key={idx}>
            <Link to={`/profile/${followed.followed_id}`}>
              <p>{followed.username}</p>
            </Link>
          </Row>
        );
      })}
    </Container>
  );
}
