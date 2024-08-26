import React, { useEffect, useState } from 'react';
import { getPopularArtists } from '../services/spotifyService';
import { Card, Row, Col } from 'react-bootstrap'; // 引入必要的 React-Bootstrap 组件
import 'bootstrap/dist/css/bootstrap.min.css';

const WhatsNew = () => {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const popularArtists = await getPopularArtists(); // 不传递任何参数
                setArtists(popularArtists);
            } catch (error) {
                console.error('Failed to fetch albums:', error);
            }
        };

        fetchAlbums();
    }, []);

    return (
        <div style={{width:'90%',marginLeft:'5%'}}>
        <h2 className="mb-3">Popular Artists</h2>
        <Row>
            {artists.length > 0 ? (
                artists.map((artist, index) => (
                    <Col key={index} md={2} className="mb-4" style={{flex: "0 0 20%",
                        maxWidth:" 20%"}}> {/* Adjusted column size for outer column */}
                        <Card className="h-100">
                            <Row className="no-gutters"> {/* Add a row inside the card for side-by-side layout */}
                                <Col md={4}> {/* Column for the image */}
                                    <Card.Img 
                                        src={artist.artist_image} 
                                        alt={artist.artist_name} 
                                        style={{ borderRadius: '50%',margin:'15%' }} 
                                    />
                                </Col>
                                <Col md={8}> {/* Column for the information */}
                                    <Card.Body className="d-flex flex-column" >
                                        <Card.Title>{artist.artist_name}</Card.Title>
                                        <Card.Text style={{ fontSize:'small' }}>
                                            <strong>Genre: </strong>
                                            <span>{artist.artist_genre}</span>
                                        </Card.Text>
                                        <Card.Text style={{ fontSize:'small' }}>
                                            <strong>Followers: </strong>
                                            <span>{artist.artist_followers.toLocaleString()}</span> {/* Added toLocaleString for better number formatting */}
                                        </Card.Text>
                                        <Card.Text style={{ fontSize:'small' }}>
                                            <strong>Popularity: </strong>
                                            <span>{artist.artist_popularity}</span>
                                        </Card.Text>
                                        <Card.Link 
                                            href={artist.artist_spotify_url} 
                                            target="_blank" 
                                            className="mt-auto"
                                        >
                                            Listen on Spotify
                                        </Card.Link>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))
            ) : (
                <Col className="col-12">No popular artists found.</Col>
            )}
        </Row>
    </div>
    );
};

export default WhatsNew;