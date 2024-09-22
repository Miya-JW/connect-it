import axios from 'axios';
const API_BASE_URL = `http://localhost:${process.env.REACT_APP_PORT_SERVER}`;

// 获取某个用户的所有blog
export const getBlogs = async (userId) => {
    const response = await axios.get(`${API_BASE_URL}/api/blogs/${userId}`, { user_id: userId });
    return response.data;
};

// 获得所有blog
export const getAllBlogs = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/blogs/`);
    return response.data;
};

// 新增blog
export const createBlog = async (blog) => {
    const response = await axios.post(`${API_BASE_URL}/api/blogs`, blog);
    return response.data;
};

// 删除blog
export const deleteBlog = async (blog_id) => {
    const response = await axios.delete(`${API_BASE_URL}/api/blogs/${blog_id}`);
    return response.data;
};

// 编辑blog
export const updateBlog = async (blog_id, newBlog) => {
    const response = await axios.put(`${API_BASE_URL}/api/blogs/${blog_id}`, newBlog);
    return response.data;
};
