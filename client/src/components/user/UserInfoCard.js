import React from "react";
import { Button, ListGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';


const UserInfoCard = (results) => {
   
    return (
        <div>

            <ListGroup>
                {results.results.map((item) => (
                    <ListGroup.Item key={item.user_id}>
                        <Card>
                            <Card.Body>
                                <div style={{ display: 'flex', marginBottom: '1rem' }}>
                                    <Card.Img className="rounded-circle"
                                        variant="top"
                                        src={`${process.env.REACT_APP_SERVER_URL}/uploads${item.user_avatar}` || 'https://via.placeholder.com/100'}
                                        style={{ width: '100px', height: '100px', marginRight: '1rem' }}
                                    />
                                    <div>
                                        <Card.Title>{item.user_name}</Card.Title>
                                        <Card.Text>Name: {`${item.user_first_name} ${item.user_last_name}` || 'Unknown'}</Card.Text>

                                        <Card.Text>Join Date: {item.user_join_date ? new Date(item.user_join_date).toLocaleDateString() : 'Unknown'}</Card.Text>
                                        <Card.Text>About: {item.user_about_me || 'None'}</Card.Text>
                                        <Card.Text>Tags: {item.user_tag || ''}</Card.Text>
                                    </div>
                                </div>

                            </Card.Body>
                        </Card>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    )
}

export default UserInfoCard;