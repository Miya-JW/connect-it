import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import header_image from '../assets/images/header_img.jpg';
import Menu from '../components/Menu';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import '../styles/Header.scss'; // 如果需要，引入专门的样式文件
import { searchItems } from '../services/spotifyService';




function Header() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 初始状态假设用户未登录
    const [searchTerm, setSearchTerm] = useState(''); // 搜索词
    const [searchType, setSearchType] = useState(''); // 搜索类型

    useEffect(() => {
        const token = localStorage.getItem('authToken');  // 从本地存储获取令牌
        setIsLoggedIn(!!token);  // 如果 token 存在，设置 isLoggedIn 为 true
    }, []);  // 依赖数组为空，表示此 effect 只在组件挂载时执行一次

    const handleLogoutLogin = () => {
        if (isLoggedIn) {
            localStorage.removeItem('authToken');  // 如果已登录，清除令牌
        }
        navigate('/auth');  // 导航到登录/注册页面
    };

    const handleHomePage = () => {
        navigate('/');
    }

    //处理搜索栏---发送搜索请求到API，返回结果------转到结果界面显示搜索结果
    const handleSearch = async () => {
        if (searchType === 'music_artist' || searchType === 'music_album') {
            try {
                const results = await searchItems(searchTerm, searchType);
               
                navigate(`/search_results/${searchType}`, { state: { results } });
            } catch (error) {
                console.error('Search failed:', error);
                // 这里可以处理错误，比如显示错误消息
            }
        } else {
            // 对于其他类型的搜索，你可以有其他的处理逻辑
        }
    };

    return (
        <header className="header">
            <p className='logo' onClick={handleHomePage}>CONNECT IT</p>
            <img src={header_image} alt='head_img' className='header_img' />
            <button onClick={handleLogoutLogin} className="logout_btn"> {isLoggedIn ? 'Logout' : 'Login'}</button>
            <Menu />
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
                        <option value="book">Book</option>
                        <option value="album">Album</option>
                        <option value="topic">Topic</option>
                        <option value="place">Place</option>
                    </Form.Control>
                    <Button className='search_btn' variant="outline-success" onClick={handleSearch}>Search</Button>
                </InputGroup>
            </Form>
        </header>
    );
}
export default Header;