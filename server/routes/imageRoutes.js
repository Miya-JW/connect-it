const express = require('express');
const router = express.Router();
const imageController = require('../controllers/ImageController');

router.get('/images', imageController.findAllImages);
router.post('/images', imageController.createImage);
router.get('/images/:id', imageController.findImageById);
router.put('/images/:id', imageController.updateImage);
router.delete('/images/:id', imageController.deleteImage);

module.exports = router;