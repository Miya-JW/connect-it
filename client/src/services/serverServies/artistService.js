import axios from 'axios';
const API_BASE_URL = `http://localhost:${process.env.REACT_APP_PORT_SERVER}`;

export const createArtist = async (artist)=>{
    const response = await axios.post(`${API_BASE_URL}/api/artists`,artist);
    return response.data;
};