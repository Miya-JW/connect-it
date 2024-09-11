import axios from 'axios';
const API_BASE_URL = `http://localhost:${process.env.REACT_APP_PORT_SERVER}`;


// 更新艺术家状态
export const updateUserArtist = async (userId, artistId) => {
    console.log(userId,artistId);
    
    const response = await axios.post(`${API_BASE_URL}/api/user_artists`,{user_id:userId,artist_id:artistId});
    return response.data;
};


export const deleteUserArtist = async (userId, artistId) => {
    console.log(userId,artistId);
    
    const response = await axios.delete(`${API_BASE_URL}/api/user_artists`, {
        data: { user_id: userId, artist_id: artistId }  // 正确地包装数据到请求体
    });
    return response.data;
};

export const getFollowedArtists = async (userId) => {
    console.log(userId);
    
    const response = await axios.get(`${API_BASE_URL}/api/user_artists/${userId}`,{user_id:userId});
    console.log(response.data);
    return response.data;
};

