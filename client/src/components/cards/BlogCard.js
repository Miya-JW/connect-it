import { React, useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { deleteBlog } from '../../services/serverServies/blogService'; // 确保路径正确
import BlogForm from '../blog/BlogForm';

const BlogCard = ({ blogs, refreshBlogs }) => {
    const userId = useSelector(state => state.user.userId); // 从 Redux 获取 userId
    const [editingBlogId, setEditingBlogId] = useState(null);

    const handleDelete = async (blogId) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            try {
                await deleteBlog(blogId);
                alert('Blog deleted successfully');
                refreshBlogs();
                // Optionally refresh the list or redirect
            } catch (error) {
                alert('Failed to delete blog');
                console.error('Delete blog error:', error);
            }
        }
    };


    return (
        <Container>
            {blogs.map(blog => (
                <Row key={blog.blog_id} className="mb-4">
                    <Col md={12}>
                        {editingBlogId === blog.blog_id ? (
                            <BlogForm blog={blog} onFinish={() => setEditingBlogId(null)} />
                        ) : (
                            <Card>
                                <Card.Body>
                                    <Card.Title>{blog.blog_title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        <img src={`${process.env.REACT_APP_IMAGE_URL}${blog.author.user_avatar}`} alt="Author" style={{ width: 30, height: 30, marginRight: 10 }} className="rounded-circle" />
                                        {blog.author.user_name}
                                    </Card.Subtitle>
                                    <Card.Text dangerouslySetInnerHTML={{ __html: blog.blog_content }} />
                                    <Card.Text>
                                        <small>{new Date(blog.blog_date).toLocaleDateString()}</small>
                                    </Card.Text>
                                    {userId == blog.blog_auther_id && (
                                        <>
                                            <Button variant="danger" onClick={() => handleDelete(blog.blog_id)}>
                                                Delete Blog
                                            </Button>
                                            <Button variant="info" onClick={() => setEditingBlogId(blog.blog_id)} style={{ marginLeft: '10px' }}>
                                                Edit Blog
                                            </Button>
                                        </>
                                    )}
                                </Card.Body>
                            </Card>
                        )}
                    </Col>
                </Row>
            ))}
        </Container>
    );
};

export default BlogCard;