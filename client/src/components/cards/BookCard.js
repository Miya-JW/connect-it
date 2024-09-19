import { React, useState } from "react";
import { Button, ListGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookCard = (results) => {
    const [expandedId, setExpandedId] = useState(null); // 用于追踪展开的摘要
    const toggleSummary = (id) => {
        setExpandedId(expandedId === id ? null : id); // 切换展开/收起
    };
    return (
        <div>
            <ListGroup>
                {results.results.map((item) => (
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
export default BookCard;