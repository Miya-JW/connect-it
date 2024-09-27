import axios from 'axios';
const API_BASE_URL = `http://localhost:${process.env.REACT_APP_PORT_SERVER}`;


export const checkAndCreateMovies = async (movies) => {
    const response = await axios.post(`${API_BASE_URL}/api/check_and_create_movies`, { movies });
    return response.data;
};


export const createArtist = async (artist) => {
    const response = await axios.post(`${API_BASE_URL}/api/artists`, artist);
    return response.data;
};

//获得用户所有专辑状态
export const getMovieStatus = async (user_id) => {
    const response = await axios.get(`${API_BASE_URL}/api/user_movie_status/${user_id}`);
    return response.data;

}

//更新专辑状态
export const updateMovieStatus = async (user_id, movie_id, movie_status) => {
    const url = `${API_BASE_URL}/api/user_movie_status`; // 确保后端路由正确
    const body = {
        user_id,
        movie_id,
        movie_status
    };
    return await axios.post(url, body);
};

export const deleteMovieStatus = async (user_id, movie_id) => {
    const response = await axios.delete(`${API_BASE_URL}/api/user_movie_status`, {
        data: { user_id: user_id, movie_id: movie_id }  // 正确地包装数据到请求体
    });
    return response.data;
};