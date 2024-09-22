import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Editor } from '@tinymce/tinymce-react'; // Import TinyMCE
import { createBlog,updateBlog } from '../../services/serverServies/blogService';

const BlogForm = ({ blog, onFinish }) => {
    const userId = useSelector(state => state.user.userId);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [showForm, setShowForm] = useState(false); // State to toggle form display

console.log(blog);

    // Effect to initialize form when editing
    useEffect(() => {
        if (blog) {
            setShowForm(true);
            setTitle(blog.blog_title);
            setContent(blog.blog_content);
        }
    }, [blog]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const blogData = {
            blog_auther_id: userId,
            blog_title: title,
            blog_content: content
        };

        try {
            if (blog) {
                await updateBlog(blog.blog_id, blogData); // Send update request
                alert('Blog updated! Check console for details.');
                setTitle('');
                setContent('');
                setShowForm(false); // Hide form after submission
            } else {
                await createBlog(blogData); // Send create request
                alert('Blog submitted! Check console for details.');
                setTitle('');
                setContent('');
                setShowForm(false); // Hide form after submission
            }

            onFinish(); // Call onFinish to hide form and refresh list
        } catch (error) {
            console.error('Error submitting blog:', error);
            alert('Failed to submit blog');
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    {showForm ? (<Form onSubmit={handleSubmit}>
                        <Form.Group controlId="blogForm.Title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter blog title"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="blogForm.Content">
                            <Form.Label>Content</Form.Label>
                            <Editor
                                apiKey={`${process.env.REACT_APP_TINYMCE_KEY}`}
                                value={content}
                                onEditorChange={(content, editor) => setContent(content)}
                                init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount'
                                    ],
                                    toolbar: 'undo redo | formatselect | ' +
                                        'bold italic backcolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help'
                                }}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                        {blog ? 'Update Blog' : 'Submit Blog'}
                        </Button>
                    </Form>) : (
                        <Button onClick={() => setShowForm(true)} variant="primary">
                            Create New Blog
                        </Button>
                    )}

                </Col>
            </Row>
        </Container>
    );
};

export default BlogForm;