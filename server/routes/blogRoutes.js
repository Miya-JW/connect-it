const express = require('express');
const router = express.Router();
const blogController = require('../controllers/BlogController');

router.get('/blogs', blogController.findAllBlogs);
router.post('/blogs', blogController.createBlog);
router.get('/blogs/:id', blogController.findBlogById);
router.put('/blogs/:id', blogController.updateBlog);
router.delete('/blogs/:id', blogController.deleteBlog);

module.exports = router;