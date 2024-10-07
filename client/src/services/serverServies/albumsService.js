import axios from 'axios';
const API_BASE_URL = `http://localhost:${process.env.REACT_APP_PORT_SERVER}`;


export const checkAndCreateAlbums = async (albums) => {
    const response = await axios.post(`${API_BASE_URL}/api/check_and_create_albums`, { albums });
    return response.data;
};


export const createArtist = async (artist) => {
    const response = await axios.post(`${API_BASE_URL}/api/artists`, artist);
    return response.data;
};

//获得用户所有专辑状态
export const getAlbumStatus = async (user_id) => {
    const response = await axios.get(`${API_BASE_URL}/api/user_album_status/${user_id}`);
    return response.data;

}

//更新专辑状态
export const updateAlbumStatus = async (user_id, album_id, album_status) => {
    const url = `${API_BASE_URL}/api/user_album_status`; // 确保后端路由正确
    const body = {
        user_id,
        album_id,
        album_status
    };
    return await axios.post(url, body);
};

export const deleteAlbumStatus = async (user_id, album_id) => {

    const response = await axios.delete(`${API_BASE_URL}/api/user_album_status`, {
        data: { user_id: user_id, album_id: album_id }  // 正确地包装数据到请求体
    });
    return response.data;
};