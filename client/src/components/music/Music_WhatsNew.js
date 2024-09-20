import React, { useEffect, useState } from 'react';
import { fetchNewReleases } from '../../services/spotifyService';
import { Row } from 'react-bootstrap'; // 引入必要的 React-Bootstrap 组件
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
        <div style={{ marginLeft: '10%' }}>
            <h2 className="mb-3">What's New</h2>
            <Row>
                <MusicAlbumCard results={albums} />
            </Row>
        </div>
    );
};

export default WhatsNew;