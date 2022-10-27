import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BiHome } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { MdOutlineAdminPanelSettings, MdOutlineQuiz } from "react-icons/md";
import { Outlet, Link, NavLink } from "react-router-dom";
function NavBar() {
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand>Q&A</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <div className="flex items-center gap-1">
                  <BiHome className="text-xl"></BiHome>
                  <NavLink to="/home">Home</NavLink>
                </div>
              </Nav.Link>
              <Nav.Link>
                <div className="flex items-center gap-1">
                  <MdOutlineQuiz className="text-xl"></MdOutlineQuiz>
                  <NavLink to="/user">User Quiz</NavLink>
                </div>
              </Nav.Link>
              <Nav.Link>
                <div className="flex items-center gap-1">
                  <MdOutlineAdminPanelSettings className="text-xl"></MdOutlineAdminPanelSettings>
                  <NavLink to="/admin">Admin</NavLink>
                </div>
              </Nav.Link>
            </Nav>
            <Nav>
              <div className="flex gap-3">
                <button className="px-3 py-1 rounded-md bg-red-500 text-white">
                  <NavLink to="/sign-in">Sign In</NavLink>
                </button>
                <button className="px-3 py-1 rounded-md bg-blue-500 text-white">
                  <NavLink to="/sign-up">Sign Up</NavLink>
                </button>
              </div>
              <NavDropdown
                title={
                  <div className="flex gap-1 items-center">
                    <FiSettings className="inline-block text-xl"></FiSettings>
                    Setting
                  </div>
                }
                id="basic-nav-dropdown">
                <NavDropdown.Item>Profile</NavDropdown.Item>
                <NavDropdown.Item>Log Out</NavDropdown.Item>
                <NavDropdown.Item>Code</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>Actions</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="mt-4">
        <Container>
          <Outlet></Outlet>
        </Container>
      </div>
    </>
  );
}

export default NavBar;
