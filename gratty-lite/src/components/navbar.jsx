import { Link, useFetcher } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

function CustomNavLink({ to, name }) {
  return (
    <div className="d-flex flex-column align-items-center">
      <Nav.Link as={Link} to={to}>
        {name}
      </Nav.Link>
      <div className="border-bottom-nav-link w-75 "></div>
    </div>
  );
}

export default function GrattyNavbar({ isAuthenticated }) {
  const fetcher = useFetcher();
  return (
    <Container fluid className="mb-2">
      <Navbar expand="sm" className="bg-body-tertiary">
        <Navbar.Brand as={Link} to="/">
          GrattyLite
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <CustomNavLink to="/" name="Home"></CustomNavLink>
            <CustomNavLink to="/about" name="About"></CustomNavLink>
            {isAuthenticated ? (
              <>
                <CustomNavLink to="/profile" name="Profile"></CustomNavLink>
                <CustomNavLink to="/lists" name="Lists"></CustomNavLink>

                <div className="d-flex flex-column align-items-center">
                  <fetcher.Form method="post" action="/logout">
                    <button className="nav-link" type="submit">
                      Log Out
                    </button>
                  </fetcher.Form>
                  <div className="border-bottom-nav-link w-75 "></div>
                </div>
              </>
            ) : (
              <CustomNavLink to="/login" name="Login"></CustomNavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}
