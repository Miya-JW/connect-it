import React, { useEffect, useState } from 'react';
import { fetchBooksByQuery } from '../../services/googleBookService';
import { Card, ListGroup, Button } from 'react-bootstrap'; // 引入必要的 React-Bootstrap 组件
import 'bootstrap/dist/css/bootstrap.min.css';

const WhatsNew = () => {
    const [books, setBooks] = useState([]);
    const [expandedId, setExpandedId] = useState(null); // 用于追踪展开的摘要

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const newBooks = await fetchBooksByQuery("", "book_newest");
                setBooks(newBooks);
            } catch (error) {
                console.error('Failed to fetch books:', error);
            }
        };

        fetchBooks();
    }, []);

    const toggleSummary = (id) => {
        setExpandedId(expandedId === id ? null : id); // 切换展开/收起
    };

    return (
        <div>
            <h2 className="mb-3">What's New</h2>
            <ListGroup style={{ width: "50%", margin: "0 auto" }}>
                {books.map((item) => (
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
        // <div style={{ marginLeft:'10%' }}>
        //     <h2 className="mb-3">What's New</h2>
        //     <Row>
        //         {books.length > 0 ? (
        //             books.map((book, index) => (
        //                 <Col key={book.book_id} md={2} className="mb-4">
        //                     <Card className="h-100" >
        //                         <Card.Img variant="top" src={book.book_image} alt={book.book_title} />
        //                         <Card.Body className="d-flex flex-column">
        //                             <Card.Title >{book.book_title}</Card.Title>

        //                             <Card.Text style={{ fontSize:'small' }}>
        //                                 <div >Author: </div>
        //                                 <div>{book.book_author||'Unkonwn'}</div>
        //                             </Card.Text>
        //                             <Card.Text style={{ fontSize:'small' }}>
        //                                 <div >Publisher: </div>
        //                                 <div>{book.book_publisher || 'Unknown'}</div>
        //                             </Card.Text>
        //                             <Card.Text style={{ fontSize:'small' }}>
        //                                 <div >Publish Date: </div>
        //                                 <div>{book.book_publish_date ? new Date(book.book_publish_date).toLocaleDateString() : 'Unknown'}</div>
        //                             </Card.Text>
        //                             <Card.Text style={{ fontSize:'small' }}>
        //                                 <div >Genre: </div>
        //                                 <div>{book.book_genre || 'None'}</div>
        //                             </Card.Text>
        //                             <Card.Text style={{ fontSize:'small' }}>
        //                                 <div >ISBN: </div>
        //                                 <div>{book.book_ISBN}</div>
        //                             </Card.Text>
        //                             <Card.Text>
        //                                 Summary: {expandedId === book.book_id ? book.book_summary : `${book.book_summary.substring(0, 100)}...`}
        //                                 <Button variant="link" onClick={() => toggleSummary(book.book_id)}>
        //                                     {expandedId === book.book_id ? 'Show Less' : 'Show More'}
        //                                 </Button>
        //                             </Card.Text>

        //                         </Card.Body>
        //                     </Card>
        //                 </Col>
        //             ))
        //         ) : (
        //             <div className="col-12">No new books found.</div>
        //         )}
        //     </Row>
        // </div>
    );
};

export default WhatsNew;