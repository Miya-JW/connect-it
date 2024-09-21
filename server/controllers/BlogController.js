const Blog = require('../models/Blog');

exports.findAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        res.send(blogs);
    } catch (error) {
        console.error("Error retrieving blogs:", error);
        res.status(500).send({ message: "Error retrieving blogs", error: error.message });
    }
};

exports.createBlog = async (req, res) => {
    console.log("后端创建新blog············",req.body)
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