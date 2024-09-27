import React from "react";
import Header from "../components/Header";
import NewMovies from "../components/movie/NewMovies";
import PopularMovies from "../components/movie/PopularMovies";

const homePage = () => {
    return (
        <div>
            <Header />
            <h1>This is movie page</h1>
            <NewMovies />
            <PopularMovies />
        </div>

    );
}

export default homePage;