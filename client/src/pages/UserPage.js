import React, { useEffect, useState } from 'react';
import Header from "../components/Header";
import { getFollowedArtists } from '../services/serverServies/userArtistService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import MusicArtistsCard from '../components/cards/MusicArtistsCard';

const UserPage = () => {
    const [artists, setArtists] = useState([]);
    const userId = useSelector(state => state.user.userId); // 从 Redux 获取 userId

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

        fetchArtists();
    }, [userId]);

    return (
        <div>
            <Header />
            <h1>Followed Artists</h1>
            <MusicArtistsCard artists={artists} />
        </div>
    );
}

export default UserPage;