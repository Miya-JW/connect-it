export const setUser = (userId, authToken) => {
    localStorage.setItem('userId', userId);
    localStorage.setItem('authToken', authToken);
    return {
        type: 'SET_USER',
        payload: { userId, authToken }
    };
};

export const logoutUser = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('authToken');
    return {
        type: 'LOGOUT'
    };
};