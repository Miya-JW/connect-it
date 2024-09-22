const {Blog, User} = require('../models/index');


exports.findAllBlogs = async (req, res) => {
console.log("后端开始获取全部blog")
    try {
        const blogs = await Blog.findAll({
            
            include: [{
                model: User, // Ensure User is properly associated and imported
                as: 'Author', // Assuming this alias from your associations
                attributes: ['user_name', 'user_avatar']
            }]
        });

        if (blogs && blogs.length > 0) {
            const result = blogs.map(blog => ({
                blog_id: blog.blog_id,
                blog_title: blog.blog_title,
                blog_auther_id:blog.blog_auther_id,
                blog_content: blog.blog_content,
                blog_date: blog.blog_date.toISOString(),
                blog_views: blog.blog_views,
                author: {
                    user_name: blog.Author.user_name,
                    user_avatar: blog.Author.user_avatar
                }
            }));
            res.send(result);
        } else {
            res.status(404).send({ message: "No blogs found for this user" });
        }
    } catch (error) {
        console.error("Error retrieving blogs by user ID:", error);
        res.status(500).send({ message: "Error retrieving blogs", error: error.message });
    }
};

exports.createBlog = async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        res.status(201).send(blog);
    } catch (error) {
        console.error("Error creating blog:", error);
        res.status(500).send({ message: "Error creating blog", error: error.message });
    }
};

exports.findBlogById = async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id);
        if (blog) {
            res.send(blog);
        } else {
            res.status(404).send({ message: "Blog not found" });
        }
    } catch (error) {
        console.error("Error retrieving blog:", error);
        res.status(500).send({ message: "Error retrieving blog", error: error.message });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const updated = await Blog.update(req.body, { where: { blog_id: req.params.id } });
        if (updated[0]) {
            res.send({ message: "Blog updated successfully" });
        } else {
            res.status(404).send({ message: "Blog not found" });
        }
    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).send({ message: "Error updating blog", error: error.message });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const deleted = await Blog.destroy({ where: { blog_id: req.params.id } });
        if (deleted) {
            res.send({ message: "Blog deleted successfully" });
        } else {
            res.status(404).send({ message: "Blog not found" });
        }
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).send({ message: "Error deleting blog", error: error.message });
    }
};

// 根据用户id查询所有blog
exports.findBlogsByUserId = async (req, res) => {
    try {
        const blogs = await Blog.findAll({
            where: { blog_auther_id: req.params.id },
            include: [{
                model: User, // Ensure User is properly associated and imported
                as: 'Author', // Assuming this alias from your associations
                attributes: ['user_name', 'user_avatar']
            }]
        });

        if (blogs && blogs.length > 0) {
            const result = blogs.map(blog => ({
                blog_id: blog.blog_id,
                blog_title: blog.blog_title,
                blog_auther_id:blog.blog_auther_id,
                blog_content: blog.blog_content,
                blog_date: blog.blog_date,
                blog_views: blog.blog_views,
                author: {
                    user_name: blog.Author.user_name,
                    user_avatar: blog.Author.user_avatar
                }
            }));
            res.send(result);
        } else {
            res.status(404).send({ message: "No blogs found for this user" });
        }
    } catch (error) {
        console.error("Error retrieving blogs by user ID:", error);
        res.status(500).send({ message: "Error retrieving blogs", error: error.message });
    }
};