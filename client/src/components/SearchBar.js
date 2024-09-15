import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import '../styles/Header.scss'; // 如果需要，引入专门的样式文件
import { searchItems } from '../services/spotifyService';
// import { getMovieByName } from '../services/movieService';
import { fetchBooksByQuery } from '../services/googleBookService';
import { searchUsers } from '../services/serverServies/searchBarService';

function SearchBar() {

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState(''); // 搜索词
    const [searchType, setSearchType] = useState(''); // 搜索类型

    //处理搜索栏---发送搜索请求到API，返回结果------转到结果界面显示搜索结果
    const handleSearch = async () => {
        console.log("searching---------",searchType);
        if (searchType === 'music_artist' || searchType === 'music_album') {
            try {
                const results = await searchItems(searchTerm, searchType);
                navigate(`/search_results/${searchType}`, { state: { results } });
            } catch (error) {
                console.error('Search failed:', error);
                // 这里可以处理错误，比如显示错误消息
            }
        } else if (searchType === 'book_title' || searchType ==='book_author') {
            try {
                const results = await fetchBooksByQuery(searchTerm, searchType);
                navigate(`/search_results/${searchType}`, { state: { results } });
            } catch (error) {
                console.error('Search failed:', error);
            }
        } else if (searchType === 'users') {
            try {
                const results = await searchUsers(searchTerm);
                navigate(`/search_results/${searchType}`, { state: { results } });
            } catch (error) {
                console.error('Search failed:', error);
            }
        }
        // else if (searchType === 'movie') {
        //     try {
        //         const results = await getMovieByName(searchTerm);
        //         navigate(`/search_results/${searchType}`, { state: { results } });
        //     } catch (error) {
        //         console.error('Search failed:', error);
        //         // 对于其他类型的搜索，你可以有其他的处理逻辑
        //     }
        // } 
    };

    return (
        <Form inline>
            <InputGroup className='input_group'>
                <FormControl
                    className='input_area'
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Form.Control
                    className='select_area'
                    as="select"
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                >
                   
                    <option value="blog">Blog</option>
                    <option value="music_artist">Music - Artist</option>
                    <option value="music_album">Music - Album</option>
                    <option value="movie">Movie</option>
                    <option value="book_title">Book - Title</option>
                    <option value="book_author">Book - Author</option>
                    <option value="album">Album</option>
                    <option value="topic">Topic</option>
                    <option value="place">Place</option>
                    <option value="users">User</option>
                </Form.Control>
                <Button className='search_btn' variant="outline-success" onClick={handleSearch}>Search</Button>
            </InputGroup>
        </Form>

    );


}

export default SearchBar;