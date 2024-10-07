import React, { useEffect, useState } from 'react';
import { getPopularAlbums } from '../../services/spotifyService'; // 确保路径正确
import { checkAndCreateAlbums } from '../../services/serverServies/albumsService';
import MusicAlbumCard from '../cards/MusicAlbumCard';

const PopularAlbums = () => {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const popularAlbums = await getPopularAlbums();
                setAlbums(popularAlbums);
                const results = await checkAndCreateAlbums(popularAlbums);
                console.log('新增受欢迎专辑:', results);
            } catch (error) {
                console.error('Failed to fetch popular albums:', error);
            }
        };

        fetchAlbums();
    }, []);

    return (
        <div className='popularAlbumsContainer'>
            <h2 className="mb-3 header1">Popular Albums</h2>
            
                <MusicAlbumCard results={albums} />
            
        </div>
    );
};

export default PopularAlbums;