import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap'; // 引入必要的 React-Bootstrap 组件
import { getFollowedArtists } from '../../services/serverServies/userArtistService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import FollowArtistBtn from '../buttons/FollowArtistBtn';



const MusicArtistsCard = ({ artists }) => {

    const userId = useSelector(state => state.user.userId); // 从 Redux 获取 userId
    const [followedArtists, setFollowedArtists] = useState({});// 记录关注的状态

    useEffect(() => {
        const fetchArtistsAndFollowedStatus = async () => {
            try {

                const followed = await getFollowedArtists(userId);  // 获取当前用户已关注的艺术家列表
                const followedIds = artists.reduce((acc, artist) => {
                    // 检查每个艺术家是否被关注，不存在于 followed 数组中则设为 false
                    acc[artist.artist_id] = followed.some(f => f.artist_id === artist.artist_id);
                    return acc;
                }, {});

                setFollowedArtists(followedIds);  // 更新关注状态
            } catch (error) {
                console.error('Failed to fetch artists or followed status:', error);
            }
        };

        fetchArtistsAndFollowedStatus();
    }, [userId, artists]);  // 当 userId 更新时重新执行

    const handleStatusChange = (artistId, newFollowStatus) => {
        setFollowedArtists(prevState => ({
            ...prevState,
            [artistId]: newFollowStatus
        }));
    };




    return (
        <div style={{ width: '90%', marginLeft: '5%' }}>

            <Row>
                {artists && artists.length > 0 ? (
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

                                            <FollowArtistBtn
                                                artistId={artist.artist_id}
                                                isFollowed={followedArtists[artist.artist_id]}
                                                userId={userId}
                                                onStatusChange={handleStatusChange}
                                            />

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
export default MusicArtistsCard;








