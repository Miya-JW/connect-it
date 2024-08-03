const express = require('express');
const router = express.Router();
const movieController = require('../controllers/MovieController');

router.get('/movies', movieController.findAllMovies);
router.post('/movies', movieController.createMovie);
router.get('/movies/:id', movieController.findMovieById);
router.put('/movies/:id', movieController.updateMovie);
router.delete('/movies/:id', movieController.deleteMovie);

module.exports = router;