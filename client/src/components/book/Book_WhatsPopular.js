import React, { useEffect, useState } from 'react';
import { fetchBooksByQuery } from '../../services/googleBookService';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookCard from '../cards/BookCard';

const WhatsNew = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const newBooks = await fetchBooksByQuery("", "book_popular");
                setBooks(newBooks);
            } catch (error) {
                console.error('Failed to fetch books:', error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div>
            <h2 className="mb-3">What's Popular</h2>
            <BookCard results={books} />
        </div>
    );
};

export default WhatsNew;