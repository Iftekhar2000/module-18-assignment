const Blog = require('../model/blogModel');

// Controller function to create a new blog post
async function createBlog(req, res) {
  try {
    const newBlogData = req.body;

    console.log(newBlogData); // Check if the newBlogData is correctly received

    const createdBlog = await Blog.create(newBlogData);
    console.log(createdBlog); // Log the created blog

    res.status(201).json(createdBlog);
  } catch (error) {
    console.error(error); // Log any error that occurs during creation
    res.status(500).json({ error: 'Could not create blog post' });
  }
}


// Controller function to get all blog posts
async function getAllBlogs(req, res) {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve blog posts' });
  }
}

// Controller function to get a specific blog post by ID
async function getBlogByTitle(req, res) {
  const blogTitle = req.params.title;
  try {
    const blog = await Blog.findOne({ title: blogTitle }).populate('comments');
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve blog' });
  }
}


// Controller function to update a blog post
async function updateBlog(req, res) {
  const blogId = req.params.id;
  const updatedData = req.body;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updatedData, { new: true });
    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: 'Could not update blog post' });
  }
}

// Controller function to delete a blog post
async function deleteBlog(req, res) {
  const blogId = req.params.id;
  try {
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Could not delete blog post' });
  }
}

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogByTitle,
  updateBlog,
  deleteBlog
};