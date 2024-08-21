const express = require('express');
const router = express.Router();
const likeController = require('../controllers/LikeController');

router.get('/likes/:user_id', likeController.getLikesByUser);
router.post('/likes/:user_id', likeController.updateOrCreateLike);

module.exports = router;