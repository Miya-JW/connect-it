const initialState = {
    userId: localStorage.getItem('userId') || null,
    authToken: localStorage.getItem('authToken') || null,
};

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                userId: action.payload.userId,
                authToken: action.payload.authToken,
            };
        case 'LOGOUT':
            return {
                ...state,
                userId: null,
                authToken: null,
            };
        default:
            return state;
    }
}