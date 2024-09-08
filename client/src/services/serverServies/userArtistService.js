import axios from 'axios';
const API_BASE_URL = `http://localhost:${process.env.REACT_APP_PORT_SERVER}`;


// 更新艺术家状态
export const updateUserArtist = async (userId, artistId) => {
    console.log(userId,artistId);
    
    const response = await axios.post(`${API_BASE_URL}/api/user_artists`,{user_id:userId,artist_id:artistId});
    return response.data;
};