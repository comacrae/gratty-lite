import { Link, useLoaderData, redirect } from "react-router-dom";
import { checkProtected, getAuthDetails } from "../components/auth";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { getListDetails } from "../middleware/loaderUtils";
import GratitudeListGroup from "../components/gratListGroups";

export async function listsLoader({ request, params }) {
  const { isProtected, redirectURL } = checkProtected(request);
  if (!isProtected) {
    return redirect(redirectURL);
  }
  const userID = params.userID;
  const { status, details } = await getListDetails(userID);
  if (status === "success") {
    return { details: details, userID: userID };
  } else {
    return null;
  }
}

export default function Lists() {
  const { details, userID } = useLoaderData();
  return (
    <Container fluid>
      {details.length > 0 ? (
        <GratitudeListGroup
          list={details}
          userID={userID}
          perGroup={4}
        ></GratitudeListGroup>
      ) : (
        <p>empty</p>
      )}
    </Container>
  );
}
