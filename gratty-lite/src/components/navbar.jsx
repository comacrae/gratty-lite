import { Link, useRouteLoaderData, useFetcher } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const FetcherButton = () => {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="post" action="/logout">
      <button className="nav-link" type="submit">
        Log Out
      </button>
    </fetcher.Form>
  );
};

export default function GrattyNavbar() {
  let { isAuthenticated } = useRouteLoaderData("root");
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Navbar.Brand as={Link} to="/">
        GrattyLite
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/">
          Home
        </Nav.Link>
        <Nav.Link as={Link} to="/about">
          About
        </Nav.Link>
        <Nav.Link as={Link} to="/profile">
          Profile
        </Nav.Link>
        {isAuthenticated ? (
          <FetcherButton />
        ) : (
          <Nav.Link as={Link} to="/login">
            Login
          </Nav.Link>
        )}
      </Nav>
    </Navbar>
  );
}
