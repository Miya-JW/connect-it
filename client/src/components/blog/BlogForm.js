import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Editor } from '@tinymce/tinymce-react'; // Import TinyMCE
import { createBlog } from '../../services/serverServies/blogService';
import { handleUpload } from '../../services/serverServies/imageService'; // 确保此路径正确

const BlogForm = () => {
    const userId = useSelector(state => state.user.userId);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const blogData = {
            blog_auther_id: userId,
            blog_title: title,
            blog_content: content
        };
        await createBlog(blogData);
        alert('Blog submitted! Check console for details.');
        setTitle('');
        setContent('');
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <Form onSubmit={handleSubmit}>
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
                            Submit Blog
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default BlogForm;