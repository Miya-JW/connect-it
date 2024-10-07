import React, { useEffect, useState } from 'react';
import { fetchNewReleases } from '../../services/spotifyService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { checkAndCreateAlbums } from '../../services/serverServies/albumsService';
import MusicAlbumCard from '../cards/MusicAlbumCard';

const WhatsNew = () => {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const newAlbums = await fetchNewReleases(); // 不传递任何参数
                setAlbums(newAlbums);
                const results = await checkAndCreateAlbums(newAlbums);
                console.log('新增专辑:', results);
            } catch (error) {
                console.error('Failed to fetch albums:', error);
            }
        };

        fetchAlbums();
    }, []);

    return (
        <div className='newAlbumsContainer'>
            <h2 className="mb-3 header1">What's New</h2>
            
                <MusicAlbumCard results={albums} />
            
        </div>
    );
};

export default WhatsNew;