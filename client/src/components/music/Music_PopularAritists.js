import React, { useEffect, useState } from 'react';
import { getPopularArtists } from '../../services/spotifyService';
import { Card, Row, Col, Button } from 'react-bootstrap'; // 引入必要的 React-Bootstrap 组件
import { updateUserArtist,deleteUserArtist,getFollowedArtists } from '../../services/serverServies/userArtistService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { createArtist } from '../../services/serverServies/artistService';


const WhatsNew = () => {
    const [artists, setArtists] = useState([]);
    const userId = useSelector(state => state.user.userId); // 从 Redux 获取 userId
    const [followedArtists, setFollowedArtists] = useState({});// 记录关注的状态

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


    // 获取用户关注的所有歌手信息，记录，更新follow按钮状态
    useEffect(() => {
        const fetchAndSetFollowedArtists = async () => {
            // 假设有API方法getFollowedArtists来获取已关注艺术家
            const followed = await getFollowedArtists(userId);
            console.log(followed);
            const followedIds = followed.reduce((acc, artist) => ({
                ...acc,
                [artist.artist_id]: true
            }), {});
            setFollowedArtists(followedIds);
        };
    
        fetchAndSetFollowedArtists();
    }, [userId]);  // 依赖于userId


    // 处理关注和不关注艺术家
    const handleArtistFollow = async (artistId) => {
        if (!userId) {
            console.error('User is not logged in');
            return;
        }
    
        const currentlyFollowed = followedArtists[artistId];
        const newFollowedState = {
            ...followedArtists,
            [artistId]: !currentlyFollowed
        };
    
        setFollowedArtists(newFollowedState);  // 先更新本地状态以响应用户操作
    
        try {
            if (!currentlyFollowed) {
                await updateUserArtist(userId, artistId);  // 关注艺术家
            } else {
                await deleteUserArtist(userId,artistId);  // 取消关注
            }
        } catch (error) {
            console.error('Failed to update artist follow status:', error);
            setFollowedArtists(followedArtists);  // 如果操作失败，恢复之前的状态
        }
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
                                            {/* <Button variant="outline-primary" onClick={() => handleArtistFollow(artist.artist_id)}>Follow</Button> */}
                                            <Button variant="outline-primary" onClick={() => handleArtistFollow(artist.artist_id)}>
                                                {followedArtists[artist.artist_id] ? 'Unfollow' : 'Follow'}
                                            </Button>

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