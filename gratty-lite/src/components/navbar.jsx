import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuth0 } from "@auth0/auth0-react";

const LoginSignupRedirectButton = ({ text }) => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className="nav-link"
      onClick={() => {
        loginWithRedirect({ appState: { returnTo: "/" } });
      }}
    >
      {text}
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

export default function GrattyNavbar() {
  let { isAuthenticated } = useAuth0();
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
        {isAuthenticated ? (
          <>
            <Nav.Link as={Link} to="/profile">
              Profile
            </Nav.Link>
            <LogoutButton />
          </>
        ) : (
          <>
            <LoginSignupRedirectButton text="Log In" />
            <LoginSignupRedirectButton text="Sign Up" />
          </>
        )}
        <Nav.Link as={Link} to="/lists">
          Lists
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
