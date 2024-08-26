import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";

const HomePage = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 初始状态假设用户未登录

    useEffect(() => {
        const token = localStorage.getItem('authToken'); // 从本地存储获取令牌
        const loggedIn = !!token; // 如果 token 存在，则认为已登录
        setIsLoggedIn(loggedIn); // 设置登录状态

        if (loggedIn) {
            navigate('/user/home'); // 如果用户已登录，导航到用户主页
        } else {
            navigate('/'); // 如果未登录，保持在当前页面或可以导航到任何公开页面
        }
    }, [navigate]); // 依赖数组包含 navigate，确保变化时能够重新执行



    return (
        <div>
            <Header />
        </div>

    );
}

export default HomePage;