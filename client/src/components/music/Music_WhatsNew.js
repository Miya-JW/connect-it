import React, { useEffect, useState } from 'react';
import { fetchNewReleases } from '../../services/spotifyService';
import { Card, Row, Col } from 'react-bootstrap'; // 引入必要的 React-Bootstrap 组件
import 'bootstrap/dist/css/bootstrap.min.css';
import { checkAndCreateAlbums } from '../../services/serverServies/albumsService';

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
                {albums.length > 0 ? (
                    albums.map((album, index) => (
                        <Col key={index} md={1} className="mb-4">
                            <Card className="h-100" >
                                <Card.Img variant="top" src={album.album_image} alt={album.album_title} />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title >{album.album_title}</Card.Title>

                                    <Card.Text style={{ fontSize: 'small' }}>
                                        <div >Artist: </div>
                                        <div>{album.album_artist_name}</div>
                                    </Card.Text>
                                    <Card.Text style={{ fontSize: 'small' }}>
                                        <div >Release Date: </div>
                                        <div>{album.album_release_date}</div>
                                    </Card.Text>
                                    <Card.Text style={{ fontSize: 'small' }}>
                                        <div >Total Tracks: </div>
                                        <div>{album.album_total_tracks}</div>
                                    </Card.Text>

                                    <Card.Link href={album.album_spotifyUrl} target="_blank" className="mt-auto">Listen on Spotify</Card.Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <div className="col-12">No new albums found.</div>
                )}
            </Row>
        </div>
    );
};

export default WhatsNew;