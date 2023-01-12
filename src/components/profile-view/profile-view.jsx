import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// // React Bootstrap Components
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Figure } from "react-bootstrap";


export const ProfileView = () => {
    const navigate = useNavigate();
    React.useEffect(() => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            getUser();
        } else {
            navigate("/login");
        }
    }, [])

    const [state, setState] = React.useState({
        Username: null,
        Password: null,
        Email: null,
        Birthday: null,
        FavoriteMovies: [],
    });

    const onRemoveFavorite = (movie) => {
        const Username = JSON.parse(localStorage.getItem("user")).Username;
        const token = localStorage.getItem("token");
        console.log(movie)
        axios
            .delete(
                `https://myflixdb-movie-api.herokuapp.com/users/${Username}/movies/${movie}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((response) => {
                console.log(response);
                alert("Movie was removed from your favorites.");
                getUser();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const onLoggedOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setState({
            ...state,
            Username: null,
        });
        navigate("/");
    }

    const getUser = () => {
        const Username = JSON.parse(localStorage.getItem("user")).Username;
        const token = localStorage.getItem("token");
        axios
            .get(`https://myflixdb-movie-api.herokuapp.com/users/${Username}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                console.log("getUserResponse", response)
                setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                    FavoriteMovies: response.data.FavoriteMovies,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const editUser = (e) => {
        e.preventDefault();
        const Username = JSON.parse(localStorage.getItem("user")).Username;
        const token = localStorage.getItem("token");
        axios
            .put(
                `https://myflixdb-movie-api.herokuapp.com/users/${Username}`,
                {
                    Username: state.Username,
                    Password: state.Password,
                    Email: state.Email,
                    Birthday: state.Birthday,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((response) => {
                console.log(response)
                setState({
                    ...state,
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                });

                localStorage.setItem("user", JSON.stringify(response.data));
                const data = response.data;
                console.log(data);
                console.log(state.Username);
                alert("Profile is updated!");
                getUser();
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    // Deregister
    const onDeleteUser = () => {
        const Username = JSON.parse(localStorage.getItem("user")).Username;
        const token = localStorage.getItem("token");

        axios
            .delete(`https://myflixdb-movie-api.herokuapp.com/users/${Username}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                console.log(response);
                alert("Profile has been deleted!");
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                window.open(`/`, "_self");
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // Set user values
    const setUsername = (value) => {
        setState({
            ...state,
            Username: value,
        });
        // this.Username = value;
    }

    const setPassword = (value) => {
        setState({
            ...state,
            Password: value,
        });
        // this.Password = value;
    }

    const setEmail = (value) => {
        setState({
            ...state,
            Email: value,
        });
        // this.Email = value;
    }

    const setBirthday = (value) => {
        // console.warn("setBirthday", value);
        setState({
            ...state,
            Birthday: value,
        });
        // this.Birthday = value;
    }

    // render() {
    // const { FavoriteMovies, Username, Email, Birthday, Password } = this.state;

    // const myFavoritesMovies = [];
    // for (let i = 0; i < movies.length; i++) {
    //     const movie = movies[i];
    //     if (FavoriteMovies.includes(movie._id)) {
    //         myFavoritesMovies.push(movie);
    //     }
    // }

    // return <>Hello</>
    return (
        <Container>
            <Row>
                <Col>
                    <Card className="user-profile">
                        <Card.Header>Your Profile</Card.Header>
                        <Card.Body>
                            <>
                                <p>Name: {state.Username}</p>
                                <p>Email: {state.Email}</p>
                                <p>Birthday: {state.Birthday}</p>
                            </>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="update-inputs">
                        <Card.Header>Update Your Profile</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <Form
                                    className="update-form"
                                    onSubmit={editUser}

                                >
                                    <Form.Group>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="Username"
                                            placeholder="New Username"
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="Password"
                                            placeholder="New Password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="Email"
                                            placeholder="New Email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Birthday</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="Birthday"
                                            onChange={(e) => setBirthday(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Button
                                            variant="warning"
                                            type="submit"
                                        >
                                            Update User
                                        </Button>
                                        <Button
                                            className="delete-button"
                                            variant="danger"
                                            type="button"
                                            onClick={onDeleteUser}
                                        >
                                            Delete User
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Card className="favorite-movies-inputs">
                <Card.Body>
                    <Row>
                        <Col xs={12}>
                            <h4>Favorite Movies</h4>
                        </Col>
                    </Row>
                    <Row>
                        {state.FavoriteMovies.map((movie) => (
                            <Col key={movie._id} className="favorite-movies">
                                <Figure>
                                    <Link to={`/movies/${movie._id}`}>
                                        <Figure.Image src={movie.ImageUrl} alt={movie.Title} />
                                        <Figure.Caption>{movie.Title}</Figure.Caption>
                                    </Link>
                                </Figure>
                                <Button
                                    className="remove"
                                    variant="secondary"
                                    onClick={() => onRemoveFavorite(movie._id)}
                                >
                                    Remove from the list
                                </Button>
                            </Col>
                        ))}
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
}