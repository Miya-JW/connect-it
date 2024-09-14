
const initialState = {
    profile: {},
    loading: false,
    error: null
};

function userProfileReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOAD_PROFILE_START':
            return { ...state, loading: true, error: null };
        case 'LOAD_PROFILE_SUCCESS':
            return { ...state, profile: action.payload, loading: false };
        case 'LOAD_PROFILE_FAILURE':
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
}

export default userProfileReducer;