import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ProfileView } from "../profile-view/profile-view";

export const NavigationBar = ({ user, onLoggedOut }) => {
    return (
        <Navbar bg="light" variant="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    MyFlix
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="logout-button">
                        {user && (
                            <Button variant="secondary" onClick={onLoggedOut}>
                                Logout
                            </Button>
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