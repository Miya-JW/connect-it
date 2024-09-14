

export const loadUserProfile = (userId) => async (dispatch) => {
    dispatch({ type: 'LOAD_PROFILE_START' });
    try {
        // 使用环境变量中的服务器地址和端口
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/${userId}`);
        const data = await response.json();
        dispatch({ type: 'LOAD_PROFILE_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'LOAD_PROFILE_FAILURE', payload: error.message });
    }
};