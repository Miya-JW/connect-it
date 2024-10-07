import Header from "../components/Header";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadUserProfile } from '../store/actions/userProfileActions';
import PasswordChangeModal from "../components/profile/PasswordChangeModal";
import { updateUsername, updateUserInfo, updateUserAvatar } from '../services/serverServies/userProfileService';

const UserProfilePage = () => {
    const userId = useSelector(state => state.user.userId); // 假设在 Redux store 的 user slice 中存有 userId
    const dispatch = useDispatch();
    const { profile, loading, error } = useSelector(state => state.userProfile);
    const [newUsername, setNewUsername] = useState('')
    const [newUserInfo, setNewUserInfo] = useState({
        user_first_name: profile.user_first_name || '',
        user_last_name: profile.user_last_name || '',
        user_date_of_birth: profile.user_date_of_birth || '',
        user_about_me: profile.user_about_me || '',
        user_avatar: profile.user_avatar || ''
    });
    const [showModal, setShowModal] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState('');

    useEffect(() => {
        setNewUserInfo({
            user_first_name: profile.user_first_name || '',
            user_last_name: profile.user_last_name || '',
            user_date_of_birth: profile.user_date_of_birth || '',
            user_about_me: profile.user_about_me || '',
            user_avatar: profile.user_avatar || ''
        });
        setNewUsername(profile.user_name);
    }, [profile]);

    const [file, setFile] = useState(null);
    // const [previewUrl, setPreviewUrl] = useState('');


    //获得用户ID
    useEffect(() => {
        if (userId) {
            dispatch(loadUserProfile(userId));
        }
    }, [dispatch, userId]);

    // 更改用户名
    const handleUsernameChange = async (e) => {

        try {
            const response = await updateUsername(userId, newUsername);
            console.log('Username successfully updated', response);

        } catch (error) {
            console.log(error.message);
        }
    };

    // 更改用户资料时更新本地状态（除了密码，用户名，头像）
    const handleInputChange = (type, value) => {
        setNewUserInfo(prevState => ({
            ...prevState,
            [type]: value
        }));
    };

    // 更改其他资料（除密码，用户名，头像）
    const handleOtherChange = async () => {
        try {
            const response = await updateUserInfo(userId, newUserInfo);
            console.log('User Information succsessfully updated', response);
        } catch (error) {
            console.log(error.message);
        }
    };

    // 处理文件选择
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
            //setPreviewUrl(URL.createObjectURL(file)); // 创建图片预览链接
        }
        console.log(URL.createObjectURL(file));
    };

    // 处理文件上传
    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('user_avatar', file);  // 'avatar' 是后端期望的字段名
        try {
            const response = await updateUserAvatar(userId, formData);
            console.log('User Avatar succsessfully updated', response);
            setAvatarUrl(`${process.env.REACT_APP_SERVER_URL}/uploads${response.user_avatar}`)
        } catch (error) {
            console.log(error.message);
        }

        setShowModal(false); // 上传后关闭弹窗
    };
    const openModal = () => {

        setShowModal(true);
        console.log("打开弹窗", showModal)
    };
    const closeModal = () => setShowModal(false);


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!profile) return <div>No profile data</div>;

    return (
        <div className="singlePage userProfilePage">
            <Header />

            <div className="pageBody">
            <div className="container mt-4">
             
                <div className="mb-3">
                    <img src={avatarUrl || `${process.env.REACT_APP_SERVER_URL}/uploads${profile.user_avatar}`} alt="avatar img" className="rounded-circle avatar_image"
                        style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                    <button  onClick={openModal} className="btn btn-primary edit_btn" >Change Avatar</button>

                    {showModal && (


                        <div className=" uploadAvatar" >
                            <input  type="file" onChange={handleFileChange} />
                            <button onClick={handleUpload} className="btn btn-primary edit_btn" style={{marginRight:'20px'}}>Upload</button>
                            <button onClick={closeModal} className="btn btn-primary delete_btn" >Cancel</button>
                        </div>

                    ) }

                </div>
                <div className="mb-3">
                    <label htmlFor="userName" className="form-label">Username</label>
                    <input type="text" className="form-control" id="userName" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                    <button className="btn btn-primary edit_btn" onClick={(e) => handleUsernameChange(e.target.value)}>Edit</button>
                </div>
                <label>Change Password</label>
                <PasswordChangeModal
                    userId={userId} />
                {/* Repeat for other fields */}
                <div className="mb-3">
                    <label htmlFor="userFirstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="userFirstName" value={newUserInfo.user_first_name} onChange={(e) => handleInputChange("user_first_name", e.target.value)} />
                    <button className="btn btn-primary edit_btn" onClick={(e) => handleOtherChange()}>Edit</button>
                </div>
                <div className="mb-3">
                    <label htmlFor="userLastName" className="form-label">Last Name</label>
                    <input type="text" value={newUserInfo.user_last_name} onChange={(e) => handleInputChange("user_last_name", e.target.value)} className="form-control" id="userLastName" />
                    <button className="btn btn-primary edit_btn" onClick={(e) => handleOtherChange()}>Edit</button>
                </div>
                <div className="mb-3">
                    <label htmlFor="userDOB" className="form-label">Date of Birth</label>
                    <input type="date" value={newUserInfo.user_date_of_birth} onChange={(e) => handleInputChange("user_date_of_birth", e.target.value)} className="form-control" id="userDOB" />
                    <button className="btn btn-primary edit_btn" onClick={(e) => handleOtherChange()}>Edit</button>
                </div>
                <div className="mb-3">
                    <label htmlFor="userAboutMe" className="form-label">About Me</label>
                    <textarea value={newUserInfo.user_about_me} onChange={(e) => handleInputChange("user_about_me", e.target.value)} className="form-control" id="userAboutMe" ></textarea>
                    <button className="btn btn-primary edit_btn" onClick={(e) => handleOtherChange()}>Edit</button>
                </div>


            </div>
        </div></div>
    );
};

export default UserProfilePage;