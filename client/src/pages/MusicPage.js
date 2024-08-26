import React from "react";
import Header from "../components/Header";
import WhatsNew from "../components/Music_WhatsNew";
import WhatsPopular from '../components/Music_WhatsPopular';
import PopularArtists from '../components/Music_PopularAritists';

const MusicPage = () => {
    return (
        <div>
            <Header />
            <PopularArtists />
            <WhatsNew />
            <WhatsPopular />

        </div>
    );
}

export default MusicPage;