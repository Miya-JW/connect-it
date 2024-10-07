import React from 'react';
import { useLocation } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';
import MusicArtistsCard from '../components/cards/MusicArtistsCard';
import UserInfoCard from '../components/cards/UserInfoCard';
import BookCard from '../components/cards/BookCard';
import MusicAlbumCard from '../components/cards/MusicAlbumCard';
import MovieCard from '../components/cards/MovieCard';


const SearchResultsPage = () => {
    const location = useLocation();
    const { results } = location.state; // 获取传递过来的搜索结果

    // 如果没有结果或 results 为空数组
    if (!results || results.length === 0) {
        return (
            <div className="singlePage searchResultsPage">

                <Header />
                <div className='pageBody'>
                    <Alert variant="warning">没有找到相关结果，请尝试其他搜索关键词。</Alert>
                </div>
            </div>
        );
    }
    // 以下是针对有结果的情况，处理不同类型的数据
    //Music Artist
    if (results[0].artist_id) {
        return (
            <div className="singlePage searchResultsPage">
                <Header />
                <div className='pageBody'>
                    <div className='searchResult'>
                        <MusicArtistsCard artists={results} />
                    </div>
                </div>
            </div>
        );
    }
    //Music Album
    else if (results[0].album_id) {
        return (
            <div className="singlePage searchResultsPage">
                <Header />
                <div className='pageBody'>
                    <div className='searchResult'>
                        <MusicAlbumCard results={results} />
                    </div>
                </div>
            </div>
        );
    }
    //Book
    else if (results[0].book_id) {
        return (
            <div className="singlePage searchResultsPage">
                <Header />
                <div className='pageBody'>
                    <div className='searchResult'>
                        <BookCard results={results} />
                    </div>
                </div>

            </div>
        )
    }
    //Users
    else if (results[0].user_id) {
        return (
            <div className="singlePage searchResultsPage">
                <Header />
                <div className='pageBody'>
                    <div className='searchResult'>
                        <UserInfoCard results={results} />
                    </div>
                </div>
            </div>
        )
    }
    else if (results[0].movie_id) {
        return (
            <div className="singlePage searchResultsPage">
                <Header />
                <div className='pageBody'>
                    <div className='searchResult'>
                        <MovieCard results={results} />
                    </div></div>
            </div>
        )
    }
}

export default SearchResultsPage;