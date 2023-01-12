import React, { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { HomeView } from "../home-view/home-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { useDispatch, useSelector } from "react-redux";
import { updateMovies, updateToken, updateUser } from "../../actions/actions";
import "./main-view.scss";

export const MainView = () => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    // const [movies, setMovies] = useState([]);

    const dispatch = useDispatch();
    const movies = useSelector((state) => state.movies);
    // const userFromStore = useSelector((state) => state.user);
    // const tokenFromStore = useSelector((state) => state.token);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            // dispatch(updateUser(JSON.parse(storedUser)));
        }
        if (storedToken) {
            setToken(storedToken);
            // dispatch(updateToken(storedToken));
        }
    }, [])

    useEffect(() => {
        if (!token) return;

        fetch("https://myflixdb-movie-api.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((movies) => {
                // setMovies(movies);
                dispatch(updateMovies(movies));
            });
    }, [token]);

    const onLoggedIn = (user, token) => {
        setUser(user)
        setToken(token)
    }

    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                setUser={setUser}
                setToken={setToken}
            />
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <>
                                <Col md={5}>
                                    <ProfileView onLoggedIn={(user) => setUser(user)} />
                                </Col>
                            </>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView onLoggedIn={onLoggedIn} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView movies={movies} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={<HomeView
                            user={user}
                            token={token}
                        />}
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};