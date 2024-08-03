const express = require('express');
const router = express.Router();
const tagController = require('../controllers/TagController');

router.get('/tags', tagController.findAllTags);
router.post('/tags', tagController.createTag);
router.get('/tags/:id', tagController.findTagById);
router.put('/tags/:id', tagController.updateTag);
router.delete('/tags/:id', tagController.deleteTag);

module.exports = router;