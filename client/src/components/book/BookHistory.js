import React, { useEffect, useState } from 'react';
import { fetchBooksByQuery } from '../../services/googleBookService';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookCard from '../cards/BookCard';

const Book_History = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const newBooks = await fetchBooksByQuery("", "book_history");
                setBooks(newBooks);
            } catch (error) {
                console.error('Failed to fetch books:', error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div className='bookHistory'>
            <h2 className="mb-3 header1">History</h2>
            <BookCard results={books} />
        </div>
    );
};

export default Book_History;