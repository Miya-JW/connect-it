import React, { useEffect, useState } from 'react';
import { fetchPopularMovies } from '../../services/tmdbService';
import MovieCard from '../cards/MovieCard';
import {checkAndCreateMovies} from '../../services/serverServies/movieService';

const NewMovies=()=>{
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const newMovies = await fetchPopularMovies(); // 不传递任何参数
                setMovies(newMovies);
                await checkAndCreateMovies(newMovies);
            } catch (error) {
                console.error('Failed to fetch movies:', error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div style={{ marginLeft: '10%' }}>
            <h2 className="mb-3">What's New</h2>
                <MovieCard results={movies} />
           
        </div>
    );




}

export default NewMovies;