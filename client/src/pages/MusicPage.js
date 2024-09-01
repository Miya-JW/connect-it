import React from "react";
import Header from "../components/Header";
import WhatsNew from "../components/music/Music_WhatsNew";
import WhatsPopular from '../components/music/Music_WhatsPopular';
import PopularArtists from '../components/music/Music_PopularAritists';

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