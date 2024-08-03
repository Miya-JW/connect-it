const express = require('express');
const router = express.Router();
const albumController = require('../controllers/AlbumController');

router.get('/albums', albumController.findAllAlbums);
router.post('/albums', albumController.createAlbum);
router.get('/albums/:id', albumController.findAlbumById);
router.put('/albums/:id', albumController.updateAlbum);
router.delete('/albums/:id', albumController.deleteAlbum);

module.exports = router;