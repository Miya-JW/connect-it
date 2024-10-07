import React from "react";
import Header from "../components/Header";
import WhatsNew from "../components/music/Music_WhatsNew";
import WhatsPopular from '../components/music/Music_WhatsPopular';
import PopularArtists from '../components/music/Music_PopularAritists';
import '../styles/MusicPage.css'

const MusicPage = () => {
    return (
        <div className="singlePage musicPage">
            <Header />
            <div className="pageBody">

           
            <PopularArtists />
            <WhatsNew />
            <WhatsPopular />
            </div>

        </div>
    );
}

export default MusicPage;