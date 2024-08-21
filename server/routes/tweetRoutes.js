const express = require('express');
const router = express.Router();
const tweetController = require('../controllers/TweetController');

router.get('/tweets', tweetController.findAllTweets);
router.post('/tweets', tweetController.createTweet);
router.get('/tweets/:id', tweetController.findTweetById);
router.put('/tweets/:id', tweetController.updateTweet);
router.delete('/tweets/:id', tweetController.deleteTweet);

module.exports = router;