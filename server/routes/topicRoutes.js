const express = require('express');
const router = express.Router();
const topicController = require('../controllers/TopicController');

router.get('/topics', topicController.findAllTopics);
router.post('/topics', topicController.createTopic);
router.get('/topics/:id', topicController.findTopicById);
router.put('/topics/:id', topicController.updateTopic);
router.delete('/topics/:id', topicController.deleteTopic);

module.exports = router;