import { userReducer } from "../../store/reducers/reducers";

export const updatePassword = async (userId, currentPassword, newPassword) => {
    try {
        const response = await fetch((`${process.env.REACT_APP_SERVER_URL}/api/users/${userId}`), {
            method: 'PUT', // 使用 PUT 方法更新数据
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currentPassword, // 用户当前密码
                newPassword // 用户希望设置的新密码
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();  // 从响应中提取具体的错误信息
            throw new Error(errorData.message || '密码更新失败');
        }

        return await response.json();  // 返回后端的响应，假设是 JSON 格式
    } catch (error) {
        console.error("更新密码错误：", error);
        throw error;  // 抛出错误，由调用方处理
    }
};

export const updateUsername = async (userId, newUsername) => {
    try {
        const response = await fetch((`${process.env.REACT_APP_SERVER_URL}/api/users/${userId}`), {
            method: 'PUT', // 使用 PUT 方法更新数据
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newUsername // 用户希望设置的新密码
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();  // 从响应中提取具体的错误信息
            throw new Error(errorData.message || '用户名更新失败');
        }

        return await response.json();  // 返回后端的响应，假设是 JSON 格式
    } catch (error) {
        console.error("更新用户名错误：", error);
        throw error;  // 抛出错误，由调用方处理
    }
};

export const updateUserInfo = async (userId, newUserInfo) => {
    try {

        const response = await fetch((`${process.env.REACT_APP_SERVER_URL}/api/users/${userId}`), {
            method: 'PUT', // 使用 PUT 方法更新数据
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newUserInfo // 用户希望设置的新内容
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();  // 从响应中提取具体的错误信息
            throw new Error(errorData.message || '用户名更新失败');
        }

        return await response.json();  // 返回后端的响应，假设是 JSON 格式
    } catch (error) {
        console.error("更新用户名错误：", error);
        throw error;  // 抛出错误，由调用方处理
    }
};

export const updateUserAvatar = async (userId, formData) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/avatar/${userId}`, {
            method: 'PUT',
            body: formData,  // 发送 FormData
        });

        if (!response.ok) {
            throw new Error('Failed to upload file');
        }

        const result = await response.json();
        return ('Upload successful', result);
    } catch (error) {
        return ('Error uploading file:', error);
    }
};