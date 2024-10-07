import React, { useEffect, useState } from 'react';
import { fetchBooksByQuery } from '../../services/googleBookService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { checkAndCreateBooks } from '../../services/serverServies/bookService';
import BookCard from '../cards/BookCard';

const Book_Computer = () => {
    const [books, setBooks] = useState([]);


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const newBooks = await fetchBooksByQuery("", "book_it");
                await checkAndCreateBooks(newBooks);
                setBooks(newBooks);
            } catch (error) {
                console.error('Failed to fetch books:', error);
            }
        };

        fetchBooks();
    }, []);


    return (
        <div className='bookComputer'>
            <h2 className="mb-3 header1">IT</h2>
            <BookCard results={books} />
        </div>
    );
};

export default Book_Computer;