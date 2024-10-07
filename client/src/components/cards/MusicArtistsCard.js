import React, { useEffect, useState } from 'react';
import { Card, Col } from 'react-bootstrap'; // 引入必要的 React-Bootstrap 组件
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


    //console.log(artists[0].artist_id);
    const scrollLeft = () => {
        const container = document.getElementById('musicCards');
        container.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        const container = document.getElementById('musicCards');
        container.scrollBy({ left: 300, behavior: 'smooth' });
    };
    return (
        <div className="musicCardsContainer">
            <button onClick={scrollLeft} className="scrollButtonL scrollButton">Left</button>
            <div className="musicCards" id="musicCards">
                {artists && artists.length > 0 ? (
                    artists.map((artist, index) => (

                        <div className="musicCardOut" key={artist.artist_id}>
                            <div className="musicCard">


                                <Card.Img className="musicImg"
                                    src={artist.artist_image}
                                    alt={artist.artist_name}
                                   
                                />


                                <div className="musicText">
                                    <div className="musicTitle">{artist.artist_name}</div>
                                    <FollowArtistBtn 
                                        artistId={artist.artist_id}
                                        isFollowed={followedArtists[artist.artist_id]}
                                        userId={userId}
                                        onStatusChange={handleStatusChange}
                                    />

                                    <Card.Text >
                                        <strong>Genre: </strong>
                                        <span>{artist.artist_genre}</span>
                                    </Card.Text>
                                    <Card.Text >
                                        <strong>Followers: </strong>
                                        <span>{artist.artist_followers ? artist.artist_followers.toLocaleString() : 'N/A'}</span> {/* Added toLocaleString for better number formatting */}
                                    </Card.Text>
                                    <Card.Text >
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



                                </div>

                            </div>
                           
                        </div>

                    ))
                ) : (
                    <Col className="col-12">No popular artists found.</Col>
                )}
            </div>
            <button onClick={scrollRight} className="scrollButtonR scrollButton">Right</button>
        </div>

    );
};
export default MusicArtistsCard;








