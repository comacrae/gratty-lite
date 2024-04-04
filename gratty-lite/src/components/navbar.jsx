import { Link, useRouteLoaderData, useFetcher } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import { Login } from "../routes/login";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className="nav-link"
      onClick={() => {
        loginWithRedirect({ appState: { returnTo: "/" } });
      }}
    >
      Log In
    </button>
  );
};

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <button
      className="nav-link"
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </button>
  );
};

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
  let { isAuthenticated } = useAuth0();
  console.log(isAuthenticated);
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
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      </Nav>
    </Navbar>
  );
}
