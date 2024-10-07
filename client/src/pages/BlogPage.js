import { React, useState, useEffect } from "react";
import Header from "../components/Header";
import { useSelector } from 'react-redux';
import BlogCard from "../components/cards/BlogCard";
import BlogForm from '../components/blog/BlogForm';
import { getAllBlogs } from '../services/serverServies/blogService';


const BlogPage = () => {
    const userId = useSelector(state => state.user.userId); // 从 Redux 获取 userId
    const [userBlogs, setUserBlogs] = useState([]);

    useEffect(() => {
        const fetchUserBlogs = async () => {
            try {
                const blogs = await getAllBlogs(userId);  // 获取当前用户已关注的用户列表

                setUserBlogs(blogs);  // 更新关注状态
            } catch (error) {
                console.error('Failed to fetch user blogs:', error);
            }
        };
        fetchUserBlogs();
    }, [userId]);


    return (
        <div className="singlePage blogPage">
            <Header />
            <div className="pageBody">
                <BlogForm />
                <BlogCard blogs={userBlogs} />
            </div>
        </div>
    );
};

export default BlogPage;