import React from "react";
import Header from "../components/Header";
import NewMovies from "../components/movie/NewMovies";
import PopularMovies from "../components/movie/PopularMovies";

const homePage = () => {
    return (
        <div className="singlePage moviePage">
            <Header />
            <div className="pageBody">
            <NewMovies />
            <PopularMovies />
            </div>
        </div>

    );
}

export default homePage;