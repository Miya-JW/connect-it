import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import { getFollowedArtists } from '../services/serverServies/userArtistService';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { useSelector } from 'react-redux';
import MusicArtistsCard from '../components/cards/MusicArtistsCard';
import MusicAlbumCard from '../components/cards/MusicAlbumCard';
import UserInfoCard from '../components/cards/UserInfoCard';
import { getAlbumStatus } from '../services/serverServies/albumsService';
import { getFollowedUsers } from '../services/serverServies/userActivityService';



const UserPage = ({ userId }) => {
    console.log("user id : ", userId)
    const [artists, setArtists] = useState([]);
    const [toListen, setToListen] = useState([]);
    const [listening, setListening] = useState([]);
    const [listened, setListened] = useState([]);
    const [following, setFollowing] = useState([]);
    //const userId = useSelector(state => state.user.userId); // 从 Redux 获取 userId

    useEffect(() => {
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

        fetchAlbums();
        fetchArtists();
        fetchFollowing();
    }, [userId]);

    return (
        <div>
            <Header />

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