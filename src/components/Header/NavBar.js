import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BiHome } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { MdOutlineAdminPanelSettings, MdOutlineQuiz } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { dologout } from "../../redux/slice/userSlice";
import { logOutUser } from "../../service/apiservice";
import ModalProfile from "./ModalProfile";
const NavBar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const handleShowProfile = () => {
    setShowProfile(true);
  };
  const handleProfile = () => {
    handleShowProfile();
  };
  const handleCLoseProfile = () => {
    setShowProfile(false);
  };
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.account.isAuthention);
  const refresh_token = useSelector((state) => state.account.refresh_token);
  const email = useSelector((state) => state.account.email);
  const handleLogout = async () => {
    const data = await logOutUser(email, refresh_token);
    if (data?.EC === 0) {
      toast.success(data.EM);
      dispatch(dologout());
    }
    if (data?.EC !== 0) {
      toast.error(data.EM);
    }
  };
  return (
    <>
      <Navbar bg="dark" expand="xl" variant="dark">
        <Container>
          <Navbar.Brand>
            <NavLink
              id="RouterNavLink"
              // style={None}
              to="/"
              className="text-xl no-underline text-white font-bold p-2 border border-white rounded-md">
              Q&A
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <div className="flex items-center gap-1 text-white">
                  <BiHome className="text-xl"></BiHome>
                  <NavLink to="/home" className="text-white">
                    Home
                  </NavLink>
                </div>
              </Nav.Link>
              <Nav.Link>
                <div className="flex items-center gap-1 text-white">
                  <MdOutlineQuiz className="text-xl"></MdOutlineQuiz>
                  <NavLink to="/quiz" className="text-white">
                    User Quiz
                  </NavLink>
                </div>
              </Nav.Link>
              <Nav.Link>
                <div className="flex items-center gap-1 text-white">
                  <MdOutlineAdminPanelSettings className="text-xl"></MdOutlineAdminPanelSettings>
                  <NavLink to="/admin" className="text-white">
                    Admin
                  </NavLink>
                </div>
              </Nav.Link>
            </Nav>
            <Nav>
              {!isAuth ? (
                <div className="flex gap-3">
                  <button className="px-3 py-1 rounded-lg bg-red-500 text-white">
                    <NavLink to="/sign-in">Sign In</NavLink>
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-blue-500 text-white">
                    <NavLink to="/sign-up">Sign Up</NavLink>
                  </button>
                </div>
              ) : (
                <div className="">
                  <NavDropdown
                    title={
                      <div className="flex gap-1 items-center text-white">
                        <FiSettings className="inline-block text-xl"></FiSettings>
                        Setting
                      </div>
                    }
                    id="basic-nav-dropdown"
                    className="text-black">
                    <NavDropdown.Item onClick={() => handleProfile()}>
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => handleLogout()}>
                      Log Out
                    </NavDropdown.Item>
                    <NavDropdown.Item>Code</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>Actions</NavDropdown.Item>
                  </NavDropdown>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="mt-4">
        <Container>
          <Outlet></Outlet>
        </Container>
      </div>
      <ModalProfile
        show={showProfile}
        handleClose={handleCLoseProfile}></ModalProfile>
    </>
  );
};

export default NavBar;
