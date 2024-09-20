import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import { getFollowedArtists } from '../services/serverServies/userArtistService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import MusicArtistsCard from '../components/cards/MusicArtistsCard';
import MusicAlbumCard from '../components/cards/MusicAlbumCard';
import { getAlbumStatus } from '../services/serverServies/albumsService';

const UserPage = () => {
    const [artists, setArtists] = useState([]);
    const [toListen, setToListen] = useState([]);
    const [listening, setListening] = useState([]);
    const [listened, setListened] = useState([]);
    const userId = useSelector(state => state.user.userId); // 从 Redux 获取 userId

    useEffect(() => {
        const fetchArtists = async () => {
            console.log("fetchAlbums")
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
        fetchAlbums();
        fetchArtists();
    }, [userId]);

    return (
        <div>
            <Header />
            <h1>Followed Artists</h1>
            <MusicArtistsCard artists={artists} />
            {toListen.length > 0 ? (<div>
                <h1>To Listen</h1>
                <MusicAlbumCard results={toListen} />
            </div>) : ''}
            <div>
                <h1>To Listen</h1>
                <MusicAlbumCard results={toListen} />
            </div>
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