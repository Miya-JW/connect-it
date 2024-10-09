import React, { useState } from 'react';
import {updatePassword} from '../../services/serverServies/userProfileService';

const PasswordChangeModal = ({ userId, onClose }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        try {
            const response = await updatePassword(userId, currentPassword, newPassword);
            console.log('Password successfully updated', response);
            onClose();  // 关闭模态框
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="modal-content changePassword">
            <form onSubmit={handlePasswordChange}>
                <div className="form-group">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input type="password" className="form-control" id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required />
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input type="password" className="form-control" id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" className="btn btn-primary expandBtn">Update Password</button>
            </form>
        </div>
    );
};

export default PasswordChangeModal;