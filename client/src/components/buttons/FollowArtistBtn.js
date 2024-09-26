import { React } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { updateUserArtist, deleteUserArtist } from '../../services/serverServies/userArtistService';

const FollowArtistBtn = ({ artistId, isFollowed, userId ,onStatusChange}) => {
  
    // 处理关注和不关注艺术家
    const handleArtistFollow = async (artistId) => {
        if (!userId) {
            console.error('User is not logged in');
            return;
        }
        const newFollowStatus = !isFollowed;
        try {
            if (isFollowed) {
             
                await deleteUserArtist(userId, artistId);
               

            } else {
                await updateUserArtist(userId, artistId);
             
            }
            onStatusChange(artistId, newFollowStatus);
        } catch (error) {
            console.error('Failed to update artist follow status:', error);
        }
    };
    return (<div className='musicBtn'>
        <Button variant="outline-primary" onClick={() => handleArtistFollow(artistId)}>
            {isFollowed ? 'Unfollow' : 'Follow'}
        </Button>
    </div>);
};

export default FollowArtistBtn;