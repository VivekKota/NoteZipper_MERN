import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { useEffect } from "react";

function Header({ setSearch }) {
  const dispatch = useDispatch();
  const naivgate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {}, [userInfo]);

  const logOutHandler = () => {
    dispatch(logout());
    naivgate("/");
  };

  return (
    <Navbar expand="lg" className="bg-primary" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="text-light text-decoration-none">
            Note Zipper
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {userInfo && (
            <Form className="d-flex mx-auto my-2 my-lg-0 align-items-center me-2">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          )}

          <Nav
            className="mx-auto my-2 my-lg-0 align-items-center me-2" // Added align-items-center class and margin class for space
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {userInfo ? (
              <>
                <Nav.Link href="/mynotes" className="me-2">
                  <Link
                    to="/mynotes"
                    className="text-light text-decoration-none"
                  >
                    My Notes
                  </Link>
                </Nav.Link>{" "}
                {/* Added margin class for space */}
                <NavDropdown
                  title={userInfo.name}
                  id="navbarScrollingDropdown"
                  className="me-2"
                >
                  {" "}
                  {/* Added margin class for space */}
                  <NavDropdown.Item href="/profile">
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logOutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
