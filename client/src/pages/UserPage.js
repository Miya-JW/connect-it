import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import { getFollowedArtists } from '../services/serverServies/userArtistService';
import 'bootstrap/dist/css/bootstrap.min.css';
import MusicArtistsCard from '../components/cards/MusicArtistsCard';
import MusicAlbumCard from '../components/cards/MusicAlbumCard';
import UserInfoCard from '../components/cards/UserInfoCard';
import { getAlbumStatus } from '../services/serverServies/albumsService';
import { getFollowedUsers, getUser} from '../services/serverServies/userActivityService';
import { ListGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';



const UserPage = ({ userId }) => {
    console.log("user id : ", userId)
    const [user, setUser] = useState([]);
    const [artists, setArtists] = useState([]);
    const [toListen, setToListen] = useState([]);
    const [listening, setListening] = useState([]);
    const [listened, setListened] = useState([]);
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            if (!userId) {
                console.log('No user ID found');
                return;  // 如果 userId 未定义，直接返回
            }
            try {
                const user = await getUser(userId);
                setUser(user);
            } catch (error) {
                console.error('Failed to process artists:', error);
            }
        }

        const fetchArtists = async () => {
            if (!userId) {
                console.log('No user ID found');
                return;  // 如果 userId 未定义，直接返回
            }
            try {
                const followedArtists = await getFollowedArtists(userId);
                // 只提取每个条目中的 Artist 对象
                const artistList = followedArtists.map(item => item.Artist);
                setArtists(artistList);  // 更新艺术家列表状态
            } catch (error) {
                console.error('Failed to process artists:', error);
            }
        };

        const fetchAlbums = async () => {
            if (!userId) {
                console.log('No user ID found');
                return;  // 如果 userId 未定义，直接返回
            }
            try {
                const response = await getAlbumStatus(userId);
                const userAlbums = response.data;

                const toListen = [];
                const listening = [];
                const listened = [];

                userAlbums.forEach(item => {
                    switch (item.album_status) {
                        case 'to listen':
                            toListen.push(item.Album);
                            break;
                        case 'listening':
                            listening.push(item.Album);
                            break;
                        case 'listened':
                            listened.push(item.Album);
                            break;
                        default:
                            // 如果状态未定义或不是预期的值，可以选择如何处理
                            break;
                    }
                });

                setToListen(toListen);
                setListening(listening);
                setListened(listened);

            } catch (error) {
                console.error('Failed to process albums:', error);
            }
        };
        const fetchFollowing = async () => {
            if (!userId) {
                console.log('No user ID found');
                return;  // 如果 userId 未定义，直接返回
            }
            try {
                const following = await getFollowedUsers(userId);

                const followingList = following.map(item => item.Following);
                setFollowing(followingList);  // 更新艺术家列表状态

            } catch (error) {
                console.error('Failed to process artists:', error);
            }
        };
        fetchUser();
        fetchAlbums();
        fetchArtists();
        fetchFollowing();
    }, [userId]);

    return (
        <div>
            <Header />
            <div>
            <h1>User</h1>
            <ListGroup>
             
                    <ListGroup.Item key={user.user_id}>
                        <Card>
                            <Card.Body>
                                <div style={{ display: 'flex', marginBottom: '1rem' }}>
                                    <Card.Img  className="rounded-circle"
                                        variant="top"
                                        src={`${process.env.REACT_APP_SERVER_URL}/uploads${user.user_avatar}` || 'https://via.placeholder.com/100'}
                                        style={{ width: '100px', height: '100px', marginRight: '1rem' }}
                                    />
                                    <div>
                                        <Card.Title >{user.user_name}</Card.Title>
                                        <Card.Text>Name: {`${user.user_first_name} ${user.user_last_name}` || 'Unknown'}</Card.Text>

                                        <Card.Text>Join Date: {user.user_join_date ? new Date(user.user_join_date).toLocaleDateString() : 'Unknown'}</Card.Text>
                                        <Card.Text>About: {user.user_about_me || 'None'}</Card.Text>
                                        <Card.Text>Tags: {user.user_tag || ''}</Card.Text>
                                    </div>
                                </div>
                                
                            </Card.Body>
                        </Card>
                    </ListGroup.Item>
                    </ListGroup>
            </div>
           
            {following.length > 0 ? (<div>
                <h1>Following</h1>
                <UserInfoCard results={following} />
            </div>) : ''}

            {artists.length > 0 ? (<div>
                <h1>Followed Artists</h1>
                <MusicArtistsCard artists={artists} />
            </div>) : ''}

            {toListen.length > 0 ? (<div>
                <h1>To Listen</h1>
                <MusicAlbumCard results={toListen} />
            </div>) : ''}

            {listening.length > 0 ? (<div>
                <h1>Listening</h1>
                <MusicAlbumCard results={listening} />
            </div>) : ''}

            {listened.length > 0 ? (<div>
                <h1>Listened</h1>
                <MusicAlbumCard results={listened} />
            </div>) : ''}

        </div>
    );
}

export default UserPage;