import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import header_image from '../assets/images/header_img.jpg';
import Menu from '../components/Menu';
import SearchBar from '../components/SearchBar';
import '../styles/Header.scss'; // 如果需要，引入专门的样式文件

function Header() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 初始状态假设用户未登录

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

    return (
        <header className="header">
            <p className='logo' onClick={handleHomePage}>CONNECT IT</p>
            <img src={header_image} alt='head_img' className='header_img' />
            <button onClick={handleLogoutLogin} className="logout_btn"> {isLoggedIn ? 'Logout' : 'Login'}</button>
            <Menu />
            <SearchBar />
        </header>
    );
}
export default Header;