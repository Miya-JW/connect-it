const Book = require('../models/Book');

exports.findAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.send(books);
    } catch (error) {
        console.error("Error retrieving books:", error);
        res.status(500).send({ message: "Error retrieving books", error: error.message });
    }
};

exports.createBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).send(book);
    } catch (error) {
        console.error("Error creating book:", error);
        res.status(500).send({ message: "Error creating book", error: error.message });
    }
};

exports.findBookById = async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.id);
        if (book) {
            res.send(book);
        } else {
            res.status(404).send({ message: "Book not found" });
        }
    } catch (error) {
        console.error("Error retrieving book:", error);
        res.status(500).send({ message: "Error retrieving book", error: error.message });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const updated = await Book.update(req.body, { where: { book_id: req.params.id } });
        if (updated[0]) {
            res.send({ message: "Book updated successfully" });
        } else {
            res.status(404).send({ message: "Book not found" });
        }
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).send({ message: "Error updating book", error: error.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const deleted = await Book.destroy({ where: { book_id: req.params.id } });
        if (deleted) {
            res.send({ message: "Book deleted successfully" });
        } else {
            res.status(404).send({ message: "Book not found" });
        }
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).send({ message: "Error deleting book", error: error.message });
    }
};





exports.checkAndCreateBooks = async (req, res) => {
    const books = req.body.books;
    try {
        const results = await Promise.all(books.map(async (book) => {
            const found = await Book.findOne({ where: { book_id: book.book_id } });
            if (!found) {
                return Book.create(book);
            }
            return null;
        }));

        // 过滤掉 null 值，仅返回新创建的艺术家数据
        const createdbooks = results.filter(a => a);
        res.status(201).json(createdbooks);
    } catch (error) {
        console.error("Error processing books:", error);
        res.status(500).json({ message: "Error processing books", error: error.message });
    }
};