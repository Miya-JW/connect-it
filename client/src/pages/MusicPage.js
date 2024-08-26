import React from "react";
import Header from "../components/Header";
import WhatsNew from "../components/Music_WhatsNew"; // 确保路径正确
import WhatsPopular from '../components/Music_WhatsPopular';

const MusicPage = () => {
    return (
        <div>
            <Header />
            <WhatsNew />
            <WhatsPopular/>
        </div>
    );
}

export default MusicPage;