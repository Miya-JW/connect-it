const express = require('express');
const router = express.Router();
const bookController = require('../controllers/BookController');

router.get('/books', bookController.findAllBooks);
router.post('/books', bookController.createBook);
router.get('/books/:id', bookController.findBookById);
router.put('/books/:id', bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);

router.post('/check_and_create_Books',bookController.checkAndCreateBooks);

module.exports = router;