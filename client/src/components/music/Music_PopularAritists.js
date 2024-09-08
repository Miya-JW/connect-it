import React, { useEffect, useState } from 'react';
import { getPopularArtists } from '../../services/spotifyService';
import { Card, Row, Col, Button } from 'react-bootstrap'; // 引入必要的 React-Bootstrap 组件
import { updateUserArtist } from '../../services/serverServies/userArtistService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { createArtist } from '../../services/serverServies/artistService';


const WhatsNew = () => {
    const [artists, setArtists] = useState([]);
    const userId = useSelector(state => state.user.userId); // 从 Redux 获取 userId

    //从spotify获取受欢迎歌手信息并写入数据库
    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const popularArtists = await getPopularArtists();
                setArtists(popularArtists);
                const createPromises = popularArtists.map(async (artist) => {
                    return createArtist(artist);
                });
                const results = await Promise.all(createPromises);
                console.log('All artists have been processed:', results);
            } catch (error) {
                console.error('Failed to fetch or create artists:', error);
            }
        };

        fetchArtists();
    }, []);





    // 更新用户对歌手的喜欢状态
    const handleArtistFollow = (artistId) => {
        if (!userId) {
            console.error('User is not logged in');
            return;
        }
        updateUserArtist(userId, artistId).catch(error => {
            console.error('Failed to update artist:', error);
        });
    };

    return (
        <div style={{ width: '90%', marginLeft: '5%' }}>
            <h2 className="mb-3">Popular Artists</h2>
            <Row>
                {artists.length > 0 ? (
                    artists.map((artist, index) => (
                        <Col key={index} md={2} className="mb-4" style={{
                            flex: "0 0 20%",
                            maxWidth: " 20%"
                        }}> {/* Adjusted column size for outer column */}
                            <Card className="h-100">
                                <Row className="no-gutters"> {/* Add a row inside the card for side-by-side layout */}
                                    <Col md={4}> {/* Column for the image */}
                                        <Card.Img
                                            src={artist.artist_image}
                                            alt={artist.artist_name}
                                            style={{ borderRadius: '50%', margin: '15%' }}
                                        />
                                    </Col>
                                    <Col md={8}> {/* Column for the information */}
                                        <Card.Body className="d-flex flex-column" >
                                            <Card.Title>{artist.artist_name}</Card.Title>
                                            <Card.Text style={{ fontSize: 'small' }}>
                                                <strong>Genre: </strong>
                                                <span>{artist.artist_genre}</span>
                                            </Card.Text>
                                            <Card.Text style={{ fontSize: 'small' }}>
                                                <strong>Followers: </strong>
                                                <span>{artist.artist_followers.toLocaleString()}</span> {/* Added toLocaleString for better number formatting */}
                                            </Card.Text>
                                            <Card.Text style={{ fontSize: 'small' }}>
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
                                            <Button variant="outline-primary" onClick={() => handleArtistFollow(artist.artist_id)}>Follow</Button>

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