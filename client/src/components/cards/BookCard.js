import { React, useState, useEffect } from "react";
import { Button, ListGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import StatusBtn from '../buttons/StatusBtn';
import { useSelector } from 'react-redux';
import { getBookStatus } from '../../services/serverServies/bookService';

const BookCard = ({ results }) => {
    const userId = useSelector(state => state.user.userId); // 从 Redux 获取 userId
    const [expandedId, setExpandedId] = useState(null); // 用于追踪展开的摘要
    const [bookStatus, setBookStatus] = useState({});
    const toggleSummary = (id) => {
        setExpandedId(expandedId === id ? null : id); // 切换展开/收起
    };

    const [detailExpandedId, setDetailExpandedId] = useState(null);
    const toggleDetail = (id) => {

        setDetailExpandedId(detailExpandedId === id ? null : id);

    }


    useEffect(() => {
        const fetchBookStatus = async () => {
            if (userId && results.length) {
                try {
                    const responses = await getBookStatus(userId);
                    const statuses = responses.data
                    const statusMap = statuses.reduce((acc, status) => {
                        acc[status.book_id] = { user_id: userId, book_id: status.book_id, book_status: status.book_status };
                        return acc;
                    }, {});

                    // 为每个专辑设置状态，如果不存在则设为空
                    const finalStatus = results.reduce((acc, book) => {
                        acc[book.book_id] = statusMap[book.book_id] || { user_id: userId, book_id: book.book_id, book_status: "" };
                        return acc;
                    }, {});

                    setBookStatus(finalStatus);

                } catch (error) {
                    console.error('获取书籍状态失败:', error);
                }
            }
        };

        fetchBookStatus();
    }, [userId, results]); // 当 userId 或 results 更新时重新执行

    const handleStatusChange = (book_id, nextStatus) => {

        setBookStatus(prev => ({
            ...prev,
            [book_id]: { "user_id": userId, "book_id": book_id, "book_status": nextStatus } // 正确引用和更新特定专辑的状态
        }));

    };


    return (
        <div>
            <ListGroup>
                {results.map((item) => (
                    <ListGroup.Item key={item.book_id}>

                        <Card.Body>
                            <Card.Img
                                variant="top"
                                src={item.book_image || 'https://via.placeholder.com/100'}
                                style={{ width: '200px', marginRight: '1rem' }}
                            />
                            <Card.Title>{item.book_title}</Card.Title>
                            <div style={{display:'flex',flexDirection:'row'}}>
                            <StatusBtn user_id={userId} targetType={'book'} targetId={item.book_id} currentStatus={bookStatus[item.book_id]?.book_status} onStatusChange={handleStatusChange} />
                            <button  className='expandBtn' onClick={() => toggleDetail(item.book_id)}>
                                {detailExpandedId ? 'Hide' : 'Show'}
                            </button>
                            </div>
                           
                            {detailExpandedId === item.book_id && (<>
                                <Card.Text>Author: {item.book_author || 'Unknown'}</Card.Text>
                                <Card.Text>Publisher: {item.book_publisher || 'Unknown'}</Card.Text>
                                <Card.Text>Publish Date: {item.book_publish_date ? new Date(item.book_publish_date).toLocaleDateString() : 'Unknown'}</Card.Text>
                                <Card.Text>Genre: {item.book_genre || 'None'}</Card.Text>
                                <Card.Text>ISBN: {item.book_ISBN}</Card.Text>
                                <Card.Text>
                                    Summary: {expandedId === item.book_id ? item.book_summary : `${item.book_summary.substring(0, 100)}...`}
                                    <Button variant="link" onClick={() => toggleSummary(item.book_id)}>
                                        {expandedId === item.book_id ? 'Show Less' : 'Show More'}
                                    </Button>
                                </Card.Text></>
                            )}
                        </Card.Body>

                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    )
}
export default BookCard;