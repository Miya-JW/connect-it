import React from "react";
import Header from "../components/Header";
import BookPsychology from "../components/book/BookPsychology";
import BookHistory from "../components/book/BookHistory";
import BookComics from '../components/book/BookComics';

import BookComputer from '../components/book/BookComputer'

const homePage = () => {
    return (
        <div className="singlePage bookPage">
            <Header />
            <div className="pageBody">
                <div className="bookPageBody">
                        <BookPsychology />
                        <BookHistory />
                        <BookComics />
                        <BookComputer />
                </div>
            </div>
        </div>

    );
}

export default homePage;