const express = require('express');
const router = express.Router();
const placeController = require('../controllers/PlaceController');

router.get('/places', placeController.findAllPlaces);
router.post('/places', placeController.createPlace);
router.get('/places/:id', placeController.findPlaceById);
router.put('/places/:id', placeController.updatePlace);
router.delete('/places/:id', placeController.deletePlace);

module.exports = router;