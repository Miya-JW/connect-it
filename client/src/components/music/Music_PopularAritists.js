import React, { useEffect, useState } from 'react';
import { getPopularArtists } from '../../services/spotifyService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { checkAndCreateArtists } from '../../services/serverServies/artistService';
import MusicArtistsCard from '../music/MusicArtistsCard';

const WhatsNew = () => {
    const [artists, setArtists] = useState([]);

    //从spotify获取受欢迎歌手信息并写入数据库
    useEffect(() => {

        const fetchArtists = async () => {
            try {
                const popularArtists = await getPopularArtists();
                setArtists(popularArtists);
                const results = await checkAndCreateArtists(popularArtists);
                console.log('新增艺术家:', results);
            } catch (error) {
                console.error('Failed to process artists:', error);
            }
        };

        fetchArtists();
    }, []);



    return (
        <div>
            <h2 className="mb-3">Popular Artists</h2>
            < MusicArtistsCard artists={artists}
            />
        </div>

    );
};

export default WhatsNew;