import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, updateToken } from "../../actions/actions";

export const NavigationBar = ({ user, setUser, setToken }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userFromStore = useSelector(state => state.user);

    const onLoggedOut = () => {
        setUser(null);
        // dispatch(updateUser(null));
        setToken(null);
        // dispatch(updateToken(null));
        localStorage.clear();
        navigate("/login");
    }
    return (
        <Navbar bg="light" variant="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    MyFlix
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="logout-button">
                        {user ? (
                            <Button variant="secondary" onClick={onLoggedOut}>
                                Logout
                            </Button>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="secondary">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button variant="secondary">
                                        Sign Up
                                    </Button>
                                </Link>
                            </>
                        )}
                    </Nav>
                    <Nav className="profile-view">
                        {user && (
                            <Link to="/profile"><Button variant="secondary">
                                My Profile
                            </Button>
                            </Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};