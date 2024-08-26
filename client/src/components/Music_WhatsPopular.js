import React, { useEffect, useState } from 'react';
import { getPopularAlbums } from '../services/spotifyService'; // 确保路径正确
import { Card, Row, Col } from 'react-bootstrap';

const PopularAlbums = () => {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const popularAlbums = await getPopularAlbums();
                setAlbums(popularAlbums);
            } catch (error) {
                console.error('Failed to fetch popular albums:', error);
            }
        };

        fetchAlbums();
    }, []);

    return (
        <div style={{ marginLeft:'10%' }}>
            <h2 className="mb-3">Popular Albums</h2>
            <Row>
                {albums.length > 0 ? (
                    albums.map((album, index) => (
                        <Col key={index} md={1} className="mb-4">
                            <Card className="h-100">
                                <Card.Img variant="top" src={album.album_image} alt={album.album_title} />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title >{album.album_title}</Card.Title>

                                    <Card.Text style={{ fontSize:'small' }}>
                                        <div >Artist:</div>
                                        <div>{album.album_artist_name}</div>
                                    </Card.Text>
                                    <Card.Text style={{ fontSize:'small' }}>
                                        <div >Release Date:</div>
                                        <div>{album.album_release_date}</div>
                                    </Card.Text>
                                    <Card.Text style={{ fontSize:'small' }}>
                                        <div >Total Tracks:</div>
                                        <div>{album.album_total_tracks}</div>
                                    </Card.Text>

                                    <Card.Link href={album.album_spotifyUrl} target="_blank" className="mt-auto">Listen on Spotify</Card.Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p>No popular albums found.</p>
                )}
            </Row>
        </div>
    );
};

export default PopularAlbums;