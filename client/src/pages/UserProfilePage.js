import Header from "../components/Header";
import React, { useEffect ,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadUserProfile } from '../store/actions/userProfileActions';
import PasswordChangeModal from "../components/profile/PasswordChangeModal";
import {updateUsername} from '../services/serverServies/userProfileService';

const UserProfilePage = () => {
    const userId = useSelector(state => state.user.userId); // 假设在 Redux store 的 user slice 中存有 userId
    const { profile, loading, error } = useSelector(state => state.userProfile);
    const [newUsername, setNewUsername]= useState('')
    const dispatch = useDispatch();

    useEffect(() => {
        if (userId) {
            dispatch(loadUserProfile(userId));
        }
    }, [dispatch, userId]);

    const handleUsernameChange = async (e) => {
      
        try {
            const response = await updateUsername(userId, newUsername);
            console.log('Username successfully updated', response);
         
        } catch (error) {
            console.log(error.message);
        }
    };



    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!profile) return <div>No profile data</div>;

    return (
        <div>
            <Header />


            <div className="container mt-4">
                <h1>User Profile</h1>
                <div className="mb-3">
                    <label htmlFor="userName" className="form-label">Username</label>
                    <input type="text"  className="form-control" id="userName" placeholder={profile.user_name} value={newUsername} onChange={(e) => setNewUsername(e.target.value)}/>
                    <button className="btn btn-primary" onClick={(e) => handleUsernameChange(e.target.value)}>Edit</button>
                </div>
                <PasswordChangeModal
                    userId={userId} />
                {/* Repeat for other fields */}
                <div className="mb-3">
                    <label htmlFor="userFirstName" className="form-label">First Name</label>
                    <input type="text" readOnly className="form-control" id="userFirstName" value={profile.user_first_name || ''} />
                    <button className="btn btn-primary">Edit</button>
                </div>
                <div className="mb-3">
                    <label htmlFor="userLastName" className="form-label">Last Name</label>
                    <input type="text" readOnly className="form-control" id="userLastName" value={profile.user_last_name || ''} />
                    <button className="btn btn-primary">Edit</button>
                </div>
                <div className="mb-3">
                    <label htmlFor="userDOB" className="form-label">Date of Birth</label>
                    <input type="date" readOnly className="form-control" id="userDOB" value={profile.user_date_of_birth || ''} />
                    <button className="btn btn-primary">Edit</button>
                </div>
                <div className="mb-3">
                    <label htmlFor="userAboutMe" className="form-label">About Me</label>
                    <textarea readOnly className="form-control" id="userAboutMe" value={profile.user_about_me || ''}></textarea>
                    <button className="btn btn-primary">Edit</button>
                </div>
                <div className="mb-3">
                    <label htmlFor="userAvatar" className="form-label">Avatar</label>
                    <input type="text" readOnly className="form-control" id="userAvatar" value={profile.user_avatar || ''} />
                    <button className="btn btn-primary">Edit</button>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;