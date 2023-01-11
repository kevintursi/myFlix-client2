import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export const HomeView = ({ user, token }) => {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        if (!token) return;

        fetch("https://myflixdb-movie-api.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((movies) => {
                setMovies(movies);

            });
    }, [token]);

    return (
        <>
            {!user ? (
                <Navigate to="/login" replace />
            ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
            ) : (
                <>
                    {movies.map((movie) => (
                        <Col className="mb-4" key={movie._id} md={3}>
                            <MovieCard movie={movie} />
                        </Col>
                    ))}
                </>
            )}
        </>
    )
}