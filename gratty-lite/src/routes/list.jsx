import { useLoaderData, redirect } from "react-router-dom";
import { checkProtected, getAuthDetails } from "../components/auth";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import { getListItems } from "../middleware/loaderUtils";

export async function listLoader({ request }) {
  const { userID } = getAuthDetails();
  const { isProtected, redirectURL } = checkProtected(request);
  if (!isProtected) {
    return redirect(redirectURL);
  }
  const listID = request.url.split("list/")[1];
  const items = await getListItems(userID, listID);
  if (items.status === "success") {
    return items.data;
  } else {
    return [];
  }
}
export default function List() {
  const items = useLoaderData();
  return (
    <Container fluid>
      <ListGroup>
        {items.map((item, idx) => (
          <ListGroup.Item key={item.post_id}>{item.item_text}</ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}
