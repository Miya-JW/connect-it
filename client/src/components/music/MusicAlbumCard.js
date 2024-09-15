import React from "react";
import { Button, ListGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

const MusicAlbumCard = (results) => {
    return (
        <div>
            <ListGroup>
                {results.results.map(item => (
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
    )
}

export default MusicAlbumCard;