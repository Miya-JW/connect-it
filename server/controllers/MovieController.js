const Movie = require('../models/Movie');

exports.findAllMovies = async (req, res) => {
    try {
        const movies = await Movie.findAll();
        res.send(movies);
    } catch (error) {
        console.error("Error retrieving movies:", error);
        res.status(500).send({ message: "Error retrieving movies", error: error.message });
    }
};

exports.createMovie = async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).send(movie);
    } catch (error) {
        console.error("Error creating movie:", error);
        res.status(500).send({ message: "Error creating movie", error: error.message });
    }
};

exports.findMovieById = async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.id);
        if (movie) {
            res.send(movie);
        } else {
            res.status(404).send({ message: "Movie not found" });
        }
    } catch (error) {
        console.error("Error retrieving movie:", error);
        res.status(500).send({ message: "Error retrieving movie", error: error.message });
    }
};

exports.updateMovie = async (req, res) => {
    try {
        const updated = await Movie.update(req.body, { where: { movie_id: req.params.id } });
        if (updated[0]) {
            res.send({ message: "Movie updated successfully" });
        } else {
            res.status(404).send({ message: "Movie not found" });
        }
    } catch (error) {
        console.error("Error updating movie:", error);
        res.status(500).send({ message: "Error updating movie", error: error.message });
    }
};

exports.deleteMovie = async (req, res) => {
    try {
        const deleted = await Movie.destroy({ where: { movie_id: req.params.id } });
        if (deleted) {
            res.send({ message: "Movie deleted successfully" });
        } else {
            res.status(404).send({ message: "Movie not found" });
        }
    } catch (error) {
        console.error("Error deleting movie:", error);
        res.status(500).send({ message: "Error deleting movie", error: error.message });
    }
};