import { Link, useLoaderData, redirect } from "react-router-dom";
import { checkProtected, getAuthDetails } from "../components/auth";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { getListDetails } from "../middleware/loaderUtils";
import GratitudeListGroup from "../components/gratListGroups";

export async function listsLoader({ request }) {
  const { isProtected, redirectURL } = checkProtected(request);
  if (!isProtected) {
    return redirect(redirectURL);
  }
  const { userID } = getAuthDetails();
  const { status, details } = await getListDetails(userID);
  if (status === "success") {
    return details;
  } else {
    return null;
  }
}

export default function Lists() {
  //const details = useLoaderData();
  const details = [
    { id: 0, created_at: "24-03-15" },
    { id: 1, created_at: "24-03-15" },
    { id: 2, created_at: "24-03-15" },
    { id: 3, created_at: "24-03-15" },
    { id: 4, created_at: "24-03-15" },
    { id: 5, created_at: "24-03-15" },
  ];
  const numDetails = details.length;
  return (
    <Container fluid>
      {numDetails > 0 ? (
        <GratitudeListGroup list={details} perGroup={4}></GratitudeListGroup>
      ) : (
        <p>empty</p>
      )}
    </Container>
  );
}
