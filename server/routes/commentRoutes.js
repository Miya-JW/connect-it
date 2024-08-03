const express = require('express');
const router = express.Router();
const commentController = require('../controllers/CommentController');

router.get('/comments', commentController.findAllComments);
router.post('/comments', commentController.createComment);
router.get('/comments/:id', commentController.findCommentById);
router.put('/comments/:id', commentController.updateComment);
router.delete('/comments/:id', commentController.deleteComment);

module.exports = router;