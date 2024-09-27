import React, { useEffect, useState } from 'react';
import { fetchBooksByQuery } from '../../services/googleBookService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { checkAndCreateBooks } from '../../services/serverServies/bookService';
import BookCard from '../cards/BookCard';

const WhatsNew = () => {
    const [books, setBooks] = useState([]);


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const newBooks = await fetchBooksByQuery("", "book_newest");
                await checkAndCreateBooks(newBooks);
                setBooks(newBooks);
            } catch (error) {
                console.error('Failed to fetch books:', error);
            }
        };

        fetchBooks();
    }, []);


    return (
        <div>
            <h2 className="mb-3">What's New</h2>
            <BookCard results={books} />
        </div>
    );
};

export default WhatsNew;