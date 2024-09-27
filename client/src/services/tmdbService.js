import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY_TMDB; // 用你的 TMDb API 密钥替换此处
const baseUrl = 'https://api.themoviedb.org/3';
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500'; // 使用宽度为 500px 的图片

export const fetchMovieByName = async (movieName) => {
    try {
        const response = await axios.get(`${baseUrl}/search/movie`, {
            params: {
                api_key: apiKey,
                query: movieName
            }
        });
        const movies = response.data.results.map(movie => ({
            movie_id: movie.id,
            movie_title: movie.title,
            movie_date: movie.release_date,
            movie_rating: movie.vote_average,
            movie_summary: movie.overview,
            movie_poster: movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : null,
            movie_imdburl: `https://www.imdb.com/title/${movie.imdb_id}` || ''// 注意，不是所有结果都包含 imdb_id
        }));
        return movies;
    } catch (error) {
        console.error('Error fetching movie by name:', error);
        throw error;
    }
};

export const fetchPopularMovies = async () => {
    try {
        const response = await axios.get(`${baseUrl}/movie/popular`, {
            params: {
                api_key: apiKey
            }
        });
        return response.data.results.map(movie => ({
            movie_id: movie.id,
            movie_title: movie.title,
            movie_date: movie.release_date,
            movie_rating: movie.vote_average,
            movie_summary: movie.overview,
            movie_poster: movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : null,
            movie_imdburl: `https://www.imdb.com/title/${movie.imdb_id}` || ''// 注意，不是所有结果都包含 imdb_id
        }));
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        throw error;
    }
};

export const fetchLatestMovies = async () => {
    try {
        const response = await axios.get(`${baseUrl}/movie/now_playing`, {
            params: {
                api_key: apiKey,
                language: 'en-US',
                page: 1
            }
        });
        return response.data.results.map(movie => ({
            movie_id: movie.id,
            movie_title: movie.title,
            movie_date: movie.release_date,
            movie_rating: movie.vote_average,
            movie_summary: movie.overview,
            movie_poster: movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : null,
            movie_imdburl: `https://www.imdb.com/title/${movie.imdb_id}` || '' // 注意，不是所有结果都包含 imdb_id
        }));
    } catch (error) {
        console.error('Error fetching latest movies:', error);
        throw error;
    }
};