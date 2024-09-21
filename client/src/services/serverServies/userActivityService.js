import axios from 'axios';
const API_BASE_URL = `http://localhost:${process.env.REACT_APP_PORT_SERVER}`;

// 获取用户
export const getUser = async (userId) => {
    const response = await axios.get(`${API_BASE_URL}/api//users/${userId}`, { user_id: userId });
    return response.data;
};


// 获取用户关注名单
export const getFollowedUsers = async (userId) => {
    const response = await axios.get(`${API_BASE_URL}/api/user_relationships/following/${userId}`, { user_id: userId });
    return response.data;
};

// 更新关注
export const followUser = async (userId, follow_id) => {
    const response = await axios.post(`${API_BASE_URL}/api/user_relationships/following`, { follower_id: userId, following_id: follow_id });
    return response.data;
};

//取消关注
export const unfollowUser = async (userId, follow_id) => {
    const response = await axios.delete(`${API_BASE_URL}/api/user_relationships/unfollow`, {
        data: { follower_id: userId, following_id: follow_id }  // 正确地包装数据到请求体
    });
    return response.data;
};

