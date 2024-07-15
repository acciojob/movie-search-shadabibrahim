import axios from "axios";
import React, { useState } from "react";

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchMovies = async (query) => {
        event.preventDefault();
        setIsLoading(true)
        setError(null)
        try {
            const response = await axios({
                method: 'get',
                url: `http://www.omdbapi.com/?s=${query}&apikey=99eb9fd1`,

            })
            // console.log(response)
            if (response.data.Response === 'True') {
                setMovies(response.data.Search)
                setQuery("")
            }
            else {
                setError("Invalid movie name. Please try again.")
            }


        } catch (error) {
            setError(error.message)

        } finally {
            setIsLoading(false);

        }

    }
    return (
        <div>
            <p>Search Movie</p>
            <div className="search-bar">
            <form onSubmit={() => fetchMovies(query)}>
            <input type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movie..."
            />
            <button type="submit">Search</button>
            </form>
          
            </div>
           
            <div>
                {/* <pre>{JSON.stringify(movies,null,2)}</pre> */}
                {
                    isLoading ? <p>Loading...</p> : error ? <p className="error">{error}</p> : (
                        <ul>
                            {
                                movies.map((movie) => (
                                    <li key={movie.imdbID}>
                                        <h2>{movie.Title} <span>({movie.Year})</span> </h2>
                                        <img src={movie.Poster} alt="" />
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
            </div>
        </div>
    )
}
export default MovieList;