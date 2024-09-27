import axios from 'axios';
const API_BASE_URL = `http://localhost:${process.env.REACT_APP_PORT_SERVER}`;


export const checkAndCreateBooks = async (books) => {
    const response = await axios.post(`${API_BASE_URL}/api/check_and_create_Books`, { books });
    return response.data;
};


//获得用户所有专辑状态
export const getBookStatus = async (user_id) => {
    const response = await axios.get(`${API_BASE_URL}/api/user_book_status/${user_id}`);
    return response.data;

}

//更新专辑状态
export const updateBookStatus = async (user_id, book_id, book_status) => {
    const url = `${API_BASE_URL}/api/user_Book_status`; // 确保后端路由正确
    const body = {
        user_id,
        book_id,
        book_status
    };
    return await axios.post(url, body);
};

export const deleteBookStatus = async (user_id, book_id) => {
    const response = await axios.delete(`${API_BASE_URL}/api/user_book_status`, {
        data: { user_id: user_id, book_id: book_id }  // 正确地包装数据到请求体
    });
    return response.data;
};