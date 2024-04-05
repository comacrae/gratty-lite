import { User } from "@auth0/auth0-react";
import { useLoaderData } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export default function Profile() {
  const user = useLoaderData();
  console.log(user);
  return <p>{new String(user.nickname)}</p>;
}
