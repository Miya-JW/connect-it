import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, ListGroup, Alert } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import MusicArtistsCard from '../components/music/MusicArtistsCard';


const SearchResultsPage = () => {
    const location = useLocation();
    const { results } = location.state; // 获取传递过来的搜索结果
    const [expandedId, setExpandedId] = useState(null); // 用于追踪展开的摘要

    // 如果没有结果或 results 为空数组
    if (!results || results.length === 0) {
        return (
            <div>
                <Header />
                <Alert variant="warning">没有找到相关结果，请尝试其他搜索关键词。</Alert>
            </div>
        );
    }
    // 以下是针对有结果的情况，处理不同类型的数据
    //Music Artist
    if (results[0].artist_id) {

        return (
            <div>
                <Header />
                <MusicArtistsCard artists={results}/>
            </div>
        );
        //Ablums
    } 
    //Music Album
    else if (results[0].album_id) {
        return (
            <div>
                <Header />
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

                                </Card.Body>
                            </Card>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        );
    } 
    //Book
    else if (results[0].book_id) {
        const toggleSummary = (id) => {
            setExpandedId(expandedId === id ? null : id); // 切换展开/收起
        };
        return (
            <div>
                <Header />
                <ListGroup>
                    {results.map((item) => (
                        <ListGroup.Item key={item.book_id}>
                            <Card>
                                <Card.Body>
                                    <div style={{ display: 'flex', marginBottom: '1rem' }}>
                                        <Card.Img
                                            variant="top"
                                            src={item.book_image || 'https://via.placeholder.com/100'}
                                            style={{ width: '100px', height: '100px', marginRight: '1rem' }}
                                        />
                                        <div>
                                            <Card.Title>{item.book_title}</Card.Title>
                                            <Card.Text>Author: {item.book_author || 'Unknown'}</Card.Text>
                                            <Card.Text>Publisher: {item.book_publisher || 'Unknown'}</Card.Text>
                                            <Card.Text>Publish Date: {item.book_publish_date ? new Date(item.book_publish_date).toLocaleDateString() : 'Unknown'}</Card.Text>
                                            <Card.Text>Genre: {item.book_genre || 'None'}</Card.Text>
                                            <Card.Text>ISBN: {item.book_ISBN}</Card.Text>
                                        </div>
                                    </div>
                                    <Card.Text>
                                        Summary: {expandedId === item.book_id ? item.book_summary : `${item.book_summary.substring(0, 100)}...`}
                                        <Button variant="link" onClick={() => toggleSummary(item.book_id)}>
                                            {expandedId === item.book_id ? 'Show Less' : 'Show More'}
                                        </Button>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        )
    }
}

export default SearchResultsPage;