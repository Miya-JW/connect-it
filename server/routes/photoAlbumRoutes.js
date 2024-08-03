const express = require('express');
const router = express.Router();
const photoAlbumController = require('../controllers/PhotoAlbumController');

router.get('/photo_albums', photoAlbumController.findAllPhotoAlbums);
router.post('/photo_albums', photoAlbumController.createPhotoAlbum);
router.get('/photo_albums/:id', photoAlbumController.findPhotoAlbumById);
router.put('/photo_albums/:id', photoAlbumController.updatePhotoAlbum);
router.delete('/photo_albums/:id', photoAlbumController.deletePhotoAlbum);

module.exports = router;