import React, { useEffect, useState } from 'react';
import { fetchBooksByQuery } from '../../services/googleBookService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { checkAndCreateBooks } from '../../services/serverServies/bookService';
import BookCard from '../cards/BookCard';

const Book_Psychology = () => {
    const [books, setBooks] = useState([]);


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const newBooks = await fetchBooksByQuery("", "book_psychology");
                await checkAndCreateBooks(newBooks);
                setBooks(newBooks);
            } catch (error) {
                console.error('Failed to fetch books:', error);
            }
        };

        fetchBooks();
    }, []);


    return (
        <div className='bookPsychology'>
            <h2 className="mb-3 header1">Psychology</h2>
            <BookCard results={books} />
        </div>
    );
};

export default Book_Psychology;