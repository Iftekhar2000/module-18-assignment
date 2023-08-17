const Comment = require('../model/commentModel');
const Blog = require('../model/blogModel');
const validator = require('validator');


// Create a new comment
async function createComment(req, res) {
  try {
    const { text, blogId } = req.body;

    if (!validator.isLength(text, { min: 1, max: 500 })) {
      return res.status(400).json({ error: 'Comment text must be between 1 and 500 characters' });
    }

    // Check if the blog exists
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    const newComment = new Comment({
      text,
      blog: blogId,
      user: req.user._id  // Get the authenticated user's ID
    });
    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}

// Update an existing comment
async function updateComment(req, res) {
    const { id } = req.params;
    const { text } = req.body;
  
    try {
      const comment = await Comment.findById(id);
  
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
  
      // Check if the authenticated user owns the comment
      if (comment.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: 'Not authorized to update this comment' });
      }
  
      comment.text = text;
      const updatedComment = await comment.save();
  
      res.json(updatedComment);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  }
  
  // Delete an existing comment
  async function deleteComment(req, res) {
    const { id } = req.params;
  
    try {
      const comment = await Comment.findById(id);
  
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
  
      // Check if the authenticated user owns the comment
      if (comment.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: 'Not authorized to delete this comment' });
      }
  
      await comment.remove();
  
      res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  }

module.exports = {
  createComment,
  updateComment,
  deleteComment
};
