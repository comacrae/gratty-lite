import { Link, useLoaderData, redirect } from "react-router-dom";
import { checkProtected, getAuthDetails } from "../components/auth";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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

function getList(details) {
  return details.map((list, idx) => {
    return <p key={idx}>{list.created_at}</p>;
  });
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
