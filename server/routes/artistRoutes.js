const express = require('express');
const router = express.Router();
const artistController = require('../controllers/ArtistController');

router.get('/artists', artistController.findAllArtists);
router.post('/artists', artistController.createArtist);
router.get('/artists/:id', artistController.findArtistById);
router.put('/artists/:id', artistController.updateArtist);
router.delete('/artists/:id', artistController.deleteArtist);

module.exports = router;