import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            _id: '63616ad71752bd38603075c6',
            Title: 'Superbad',
            Description: 'Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.',
            Genre: {
                Name: 'Comedy',
                Description: 'A comedy film is a category of film which emphasizes humor. These films are designed to make the audience laugh through amusement'
            },
            Director: {
                Name: 'Greg Mottola',
                Bio: 'Gregory J. Mottola is an American film director, screenwriter, and television director.',
                Birth: '1964'
            },
            ImageUrl: 'https://upload.wikimedia.org/wikipedia/en/8/8b/Superbad_Poster.png',
            Featured: true,
        },
        {
            _id: '63616b891752bd38603075c7',
            Title: 'Good Will Hunting',
            Description: 'Will Hunting, a janitor at M.I.T., has a gift for mathematics, but needs help from a psychologist (played by Robin Williams)  to find direction in his life.',
            Genre: {
                Name: 'Psychological Drama',
                Description: 'A sub-genre of drama that places emphasis on psychological elements.',
            },
            Director: {
                Name: 'Gus Van Sant',
                Bio: 'Gus Van Sant is an American film director, producer, photographer, and musician.',
                Birth: '1952',
            },
            ImageUrl: 'https://upload.wikimedia.org/wikipedia/en/5/52/Good_Will_Hunting.png',
            Featured: false,
        },
        {
            _id: '63616bee1752bd38603075c8',
            Title: 'The Shawshank Redemption',
            Description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
            Genre: {
                Name: 'Drama',
                Description: 'A drama film is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.',
            },
            Director: {
                Name: 'Frank Darabont',
                Bio: 'Frank Darabont is an American film director, screenwriter, and producer.',
                Birth: '1959',
            },
            ImageUrl: 'https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg',
            Featured: false,
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};