import React, { useEffect, useState } from 'react';
import { fetchBooksByQuery } from '../../services/googleBookService';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookCard from '../cards/BookCard';

const BookComics = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const newBooks = await fetchBooksByQuery("", "book_comics");
                setBooks(newBooks);
            } catch (error) {
                console.error('Failed to fetch books:', error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div className='bookComics'>
            <h2 className="mb-3 header1">Comics</h2>
            <BookCard results={books} />
        </div>
    );
};

export default BookComics;