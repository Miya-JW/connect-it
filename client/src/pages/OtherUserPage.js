import React from 'react';
import UserPage from './UserPage';
import { useLocation } from 'react-router-dom';

const OtherUserPage=()=>{
    const location = useLocation();
    const userId = location.state?.userId;
    return(
        <UserPage userId={userId}/>
    )
}

export default OtherUserPage;