import { Link, useLoaderData, redirect } from "react-router-dom";
import { checkProtected, getAuthDetails } from "../components/auth";
import Container from "react-bootstrap/Container";

export async function listLoader({ request }) {
  const { isProtected, redirectURL } = checkProtected(request);
  if (!isProtected) {
    return redirect(redirectURL);
  }
  request.params;
}
export default function List() {
  return <Container fluid></Container>;
}
