import { React, useState, useEffect } from 'react'
import Search from './Components/Search.jsx'
import Spinner from './Components/Spinner.jsx';
import MovieCard from './Components/MovieCard.jsx';
import { useDebounce } from 'react-use';


const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;


const API_OPTIONS =
{
  method: 'GET',
  headers:
  {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {

  const [SearchTerm, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [debounceTerm, setDebounceTerm] = useState("");

  const fetchMovies = async (query = '') => {

    setisLoading(true);
    setErrorMessage('');

    try {

      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Failed to fetch movies!');
      }

      const data = await response.json();


      if (data.response == 'False') {
        setErrorMessage(data.error || 'Failed to fetch movies!');
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);
      console.log(movieList);
    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
      setErrorMessage("Error fetching movies. Please try again later!");
    } finally {
      setisLoading(false);
    }

  }


  useDebounce(() => setDebounceTerm(SearchTerm), 1000, [SearchTerm]);
  useEffect(() => {
    fetchMovies(debounceTerm);
  }, [debounceTerm]);

  return (
    <main>

      <div className='pattern' />

      <div className="wrapper">

        <header>

          <img src="./hero.png" alt="hero-banner" />
          <h1>Find <span className='text-gradient'>Movies</span> you'll enjoy without Hassle</h1>
          <p>Search</p>
          <Search SearchTerm={SearchTerm} setSearch={setSearch} />

        </header>

        <section className="all-movies">

          <h2 className='mt-[40px]'>All Movies</h2>

          {isLoading ? (
            <>
              <div className='flex items-center justify-around'>
                <Spinner />
              </div>
            </>

          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}

        </section>

      </div>

    </main>
  )
}

export default App
