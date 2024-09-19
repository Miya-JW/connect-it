import React from "react";
import Header from "../components/Header";
import CurrentLocation from '../components/place/CurrentLocation';
// import PopularLocation from '../components/place/PopularLocation';

const homePage = () => {
    return (
        <div>
            <Header />
            <h1>This is place page</h1>
            <CurrentLocation/>
            {/* <PopularLocation/> */}
        </div>

    );
}

export default homePage;