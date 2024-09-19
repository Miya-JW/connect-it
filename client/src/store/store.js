import { configureStore } from '@reduxjs/toolkit';
import {userReducer} from './reducers/reducers';
import userProfileReducer from './reducers/userProfileReducer'; 


const store = configureStore({
    reducer: {
        user: userReducer,
        userProfile: userProfileReducer
       
    }
});

export default store;