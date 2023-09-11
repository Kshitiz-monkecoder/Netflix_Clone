import React, { useEffect, useState } from 'react';
import './Home.sass';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {BiPlay} from 'react-icons/bi'
import {AiOutlinePlus} from 'react-icons/ai'


// API Key and URL for The Movie Database (TMDb)
const apiKey = '89473da0552100acab8d68477b2a0780';
const url = 'https://api.themoviedb.org/3';

// Endpoint constants for various movie categories
const upcomingEndpoint = 'upcoming';
const nowPlaying = 'now_playing';
const popular = 'popular';
const topRated = 'top_rated';


// Card component to display movie posters
const Card = ({ img }) => {
  return (
    <img className='card' src={`https://image.tmdb.org/t/p/w500/${img}`} alt="cover" />
  );
}

//Row component to display row
const Row = ({ title, arr = [] }) => {
  return (
    <div className='row'>
      <h2>{title}</h2>
      <div>
        {
          arr.map((item, index) => (
            <Card img={item.poster_path} key={index} />
          ))
        }
      </div>
    </div>
  );
}

const Home = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const response = await axios.get(`${url}/movie/${upcomingEndpoint}`, {
          params: {
            api_key: apiKey,
          },
        });

        const { results } = response.data;
        setUpcomingMovies(results);
      } catch (error) {
        console.error('Error fetching upcoming movies:', error);
      }
    };
    
    // ... other fetch functions for nowPlaying, popular, topRated ...
    const fetchNowPlaying = async () => {
      try {
        const response = await axios.get(`${url}/movie/${nowPlaying}`, {
          params: {
            api_key: apiKey,
          },
        });

        const { results } = response.data;
        setNowPlayingMovies(results);
      } catch (error) {
        console.error('Error fetching upcoming movies:', error);
      }
    };
    
    const fetchPopular = async () => {
      try {
        const response = await axios.get(`${url}/movie/${popular}`, {
          params: {
            api_key: apiKey,
          },
        });

        const { results } = response.data;
        setPopularMovies(results);
      } catch (error) {
        console.error('Error fetching upcoming movies:', error);
      }
    };


    const fetchTopRated = async () => {
      try {
        const response = await axios.get(`${url}/movie/${topRated}`, {
          params: {
            api_key: apiKey,
          },
        });

        const { results } = response.data;
        setTopRatedMovies(results);
      } catch (error) {
        console.error('Error fetching upcoming movies:', error);
      }
    };

    const getAllGenre = async () => {
      try {
        const response = await axios.get(`${url}/genre/movie/list`, {
          params: {
            api_key: apiKey,
          },
        });

        const { genres } = response.data;
        setGenre(genres); 
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    // Call all the data fetching functions
    getAllGenre();
    fetchUpcoming();
    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();
  

  }, []);

  return (
    <section className='home'>
      <div className="banner" style={{
        backgroundImage: popularMovies[0] ? `url('https://image.tmdb.org/t/p/w500/${popularMovies[0].poster_path}')` : ''
      }}>

      {
        popularMovies[12] && (
          <h1>{popularMovies[12].original_title}</h1>
        )
      }
      
      {
        popularMovies[12] && (
          <p>{popularMovies[12].overview}</p>
        )
      }

        <button><BiPlay/>Play</button>
      <button>My list<AiOutlinePlus/></button>

      </div>

      <Row title="Upcoming Movies" arr={upcomingMovies} />
      <Row title="Now Playing" arr={nowPlayingMovies} />
      <Row title="Popular" arr={popularMovies} />
      <Row title="Top Rated" arr={topRatedMovies} />
      {/* Add more Rows with different titles here */}
      <div className='genreBox'>
        {
          genre.map((item) => (
            <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
          ))
        }
      </div>
    </section>
  );
}

export default Home;
