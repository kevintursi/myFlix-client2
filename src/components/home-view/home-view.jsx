import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Col, FormControl } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../actions/actions';

export const HomeView = ({ user }) => {
    const movies = useSelector((state) => state.movies);
    const filter = useSelector((state) => state.filter);
    const dispatch = useDispatch();
    const handleChange = (e) => {
        dispatch(setFilter(e.target.value));
    }

    const filteredMovies = movies.filter((movie) => movie.Title.toLowerCase().includes(filter.toLowerCase()));

    return (
        <>
            {!user ? (
                <Navigate to="/login" replace />
            ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
            ) : (
                <>
                    <FormControl
                        className='py-3 my-3 w-60'
                        value={filter}
                        onChange={handleChange}
                        placeholder='Search by Title...'
                    />
                    {filteredMovies.map((movie) => (
                        <Col className="mb-4" key={movie._id} md={3}>
                            <MovieCard movie={movie} />
                        </Col>
                    ))}
                </>
            )}
        </>
    )
}