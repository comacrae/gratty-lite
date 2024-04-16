import { Link, useLoaderData, redirect } from "react-router-dom";
import { checkProtected, getAuthDetails } from "../components/auth";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { getListDetails } from "../middleware/loaderUtils";

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

function getLists(details, perRow) {
  const lists = new Array();
  const idx = 1;
  while (idx < details.length) {}
}
export default function Lists() {
  const details = useLoaderData();
  const numDetails = details.length;
  return (
    <Container fluid>
      {numDetails > 0 ? getList(details) : <p>empty</p>}
    </Container>
  );
}
