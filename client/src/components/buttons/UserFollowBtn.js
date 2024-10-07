import { React } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { followUser, unfollowUser } from "../../services/serverServies/userActivityService";


const UserFollowBtn = ({ follow_id, isFollowed, userId, onStatusChange }) => {

    //处理关注和不关注用户
    const handleUserFollow = async (follow_id) => {
        if (!userId) {
            console.error('User is not logged in');
            return;
        }

        const newFollowStatus = !isFollowed;
        try {
            if (!isFollowed) {
                await followUser(userId, follow_id);
            } else {
                await unfollowUser(userId, follow_id);
            }
            onStatusChange(follow_id, newFollowStatus);
        } catch (error) {
            console.error('Failed to update user follow status:', error);
        }
    };
    return (
        <Button className={isFollowed?'followBtn delete_btn':'followBtn edit_btn'}  variant="outline-primary"
            onClick={() => handleUserFollow(follow_id)}
        >
            {isFollowed ? 'Unfollow' : 'Follow'}
        </Button>
    );
};

export default UserFollowBtn;