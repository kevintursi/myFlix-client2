import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.ImageUrl} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>Director: {movie.Director.Name}</Card.Text>
                <Button onClick={() => onMovieClick(movie)} variant="link">
                    Open
                </Button>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        genre: PropTypes.object.isRequired,
        director: PropTypes.object,
        image: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};