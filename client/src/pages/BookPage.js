import React from "react";
import Header from "../components/Header";
import WhatsNew from "../components/book/Book_WhatsNew";
import WhatsPopular from "../components/book/Book_WhatsPopular";

const homePage = () => {
    return (
        <div>
            <Header />
           <WhatsNew/>
           <WhatsPopular/>
        </div>

    );
}

export default homePage;