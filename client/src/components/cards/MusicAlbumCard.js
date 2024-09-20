import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import StatusBtn from '../buttons/StatusBtn';
import { getAlbumStatus } from '../../services/serverServies/albumsService'

const MusicAlbumCard = ({ results }) => {
    const userId = useSelector(state => state.user.userId); // 从 Redux 获取 userId
    const [albumStatus, setAlbumStatus] = useState({});

    useEffect(() => {
        const fetchAlbumStatus = async () => {
            if (userId && results.length) {
                try {

                    const responses = await getAlbumStatus(userId);
                    const statuses = responses.data

                    const statusMap = statuses.reduce((acc, status) => {
                        acc[status.album_id] = { user_id: userId, album_id: status.album_id, album_status: status.album_status };
                        return acc;
                    }, {});

                    // 为每个专辑设置状态，如果不存在则设为空
                    const finalStatus = results.reduce((acc, album) => {
                        acc[album.album_id] = statusMap[album.album_id] || { user_id: userId, album_id: album.album_id, album_status: "" };
                        return acc;
                    }, {});

                    setAlbumStatus(finalStatus);

                } catch (error) {
                    console.error('获取专辑状态失败:', error);
                }
            }
        };

        fetchAlbumStatus();
    }, [userId, results]); // 当 userId 或 results 更新时重新执行

    const handleStatusChange = (album_id, nextStatus) => {

        setAlbumStatus(prev => ({
            ...prev,
            [album_id]: { "user_id": userId, "album_id": album_id, "album_status": nextStatus } // 正确引用和更新特定专辑的状态
        }));
        console.log(albumStatus);
    };

    return (
        <div>
            <ListGroup>
                {results.map(item => (
                    // Card for Album
                    <ListGroup.Item key={item.album_id}>
                        <Card>
                            <Card.Body>
                                <Card.Img variant="top" src={item.album_image} style={{ width: '100px', height: '100px' }} />
                                <Card.Title>{item.album_title}</Card.Title>
                                <Card.Text>Artist: {item.album_artist_name}</Card.Text>
                                <Card.Text>Release Date: {new Date(item.album_release_date).toLocaleDateString()}</Card.Text>
                                <Card.Text>Total Tracks: {item.album_total_tracks}</Card.Text>
                                <Card.Link href={item.album_spotifyUrl} target="_blank">Listen on Spotify</Card.Link>

                                < StatusBtn user_id={userId} targetId={item.album_id} currentStatus={albumStatus[item.album_id]?.album_status} onStatusChange={handleStatusChange} />

                            </Card.Body>
                        </Card>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    )
}

export default MusicAlbumCard;