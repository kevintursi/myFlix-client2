import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
    const { movieId, handleFavorite } = useParams();

    const movie = movies.find((m) => m._id === movieId);

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
                onClick={() => handleFavorite(movie._id, "add")}
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