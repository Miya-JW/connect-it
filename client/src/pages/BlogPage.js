import {React,useState} from "react";
import Header from "../components/Header";

import BlogForm from '../components/blog/BlogForm';


const BlogPage = () => {


    return (
        <div>
        <Header/>
        <BlogForm/>
        </div>
    );
};

export default BlogPage;