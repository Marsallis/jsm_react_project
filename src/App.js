import {useEffect, useState} from 'react';

import MovieCard from './MovieCard';

import './App.css';
import SearchIcon from './search.svg';

// d5c2ed9d

//API variable
const API_URL = 'http://www.omdbapi.com?apikey=d5c2ed9d'

const App = () => {

    //Set State of search to allow dynamic data
    const [searchTerm, setSearchTerm] = useState("");

    //Set State to allow movie data to be dymanic
    const [movies, setMovies] = useState([]);

    //Function to search movies, async because it is going to take some time
    const searchMovies = async (title) => {

        //getting response of API call
        const response = await fetch(`${API_URL}&s=${title}`);

        //getting data from API
        const data = await response.json();

        setMovies(data.Search);
    }

    //Using use effect to display the movies as soon as the page loads
    useEffect(() => {
        searchMovies('Batman');
    }, [])

    //returns Header, Search bar, and maps through the Movies to display Movie Cards if more than zero are there
    return(
        <div className='app'>
            <h1>MovieLand</h1>
            <div className='search'>
                <input
                    placeholder='Search for movies'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img 
                    src={SearchIcon}
                    alt='search'
                    onClick={() => searchMovies(searchTerm)}
                />
                </div>

                {
                    movies?.length > 0
                      ? (
                            <div className='container'>
                                {movies.map((movie)=> (
                                    <MovieCard movie={movie} />
                                ))}
                            </div>
                        ) : (
                            <div className='empty'>
                                <h2>No movies found</h2>
                            </div>
                        )
                }
            
        </div>
    );
}

export default App;