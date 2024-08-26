import React from 'react';
import { useLocation } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Header from '../components/Header';


const SearchResultsPage = () => {
    const location = useLocation();
    const { results } = location.state; // 获取传递过来的搜索结果

    //Artist
    if (results[0].artist_id) {

        return (
            <div>
                <Header />
                <ListGroup>
                    {results.map(item => (
                        // Card for Artist
                        <ListGroup.Item key={item.artist_id}>
                            <Card>
                                <Card.Body>
                                    <Card.Img variant="top" src={item.artist_image} style={{ width: '100px', height: '100px' ,borderRadius:'50%'}} />
                                    <Card.Title>{item.artist_name}</Card.Title>
                                    <Card.Text>Genre: {item.artist_genre}</Card.Text>
                                    <Card.Text>Followers: {item.artist_followers.toLocaleString()}</Card.Text>
                                    <Card.Text>Popularity: {item.artist_popularity}</Card.Text>
                                    <Card.Link href={item.artist_spotify_url} target="_blank">Listen on Spotify</Card.Link>
                           
                                </Card.Body>
                            </Card>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        );
        //Ablums
    } else if (results[0].album_id) {
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
}

export default SearchResultsPage;