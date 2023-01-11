import React from 'react';
import { useState } from 'react';
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./movie-view.scss";
import axios from 'axios';

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const navigate = useNavigate();

    const handleFavorite = () => {
        const Username = JSON.parse(localStorage.getItem("user")).Username;
        const token = localStorage.getItem("token");
        axios
            .post(
                `https://myflixdb-movie-api.herokuapp.com/users/${Username}/movies/${movieId}`,
                null,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((response) => {
                console.log(response)
                navigate("/")
            })
            .catch(function (error) {
                console.error(error);
            });


        //     if (action === "add") {
        //         setFavoriteMovies([...favoriteMovies, movie]);
        //     }
    };

    const movie = movies.find((movie) => movie._id === movieId);

    return (
        <div>
            <div>
                <img src={movie.ImageUrl} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director.Name}</span>
            </div>
            <div>
                <span>Director's Bio: </span>
                <span>{movie.Director.Bio}</span>
            </div>
            <div>
                <span>Director's Birth Year: </span>
                <span>{movie.Director.Birth}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre.Name}</span>
            </div>
            <div>
                <span>Genre Description: </span>
                <span>{movie.Genre.Description}</span>
            </div>
            <Button
                className="favorite-button mt-2"
                variant="primary"
                onClick={() => handleFavorite()}
            >Add to Favorite Movies
            </Button>
            <Link to={`/`}>
                <Button
                    className="back-button"
                    style={{ cursor: "pointer" }}
                >
                    Back
                </Button>
            </Link>
        </div>
    );
};