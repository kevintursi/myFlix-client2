export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img src={movie.image} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.description}</span>
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
                <span>{movie.genre.Name}</span>
            </div>
            <div>
                <span>Genre Description: </span>
                <span>{movie.genre.Description}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};