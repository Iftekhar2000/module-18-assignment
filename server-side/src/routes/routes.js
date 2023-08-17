const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');
const authController = require('../controller/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const authorizationMiddleware = require('../middlewares/authorizationMiddleware');
const commentController = require("../controller/commentController");
const validationMiddleware = require('../middlewares/validateInputs'); // Import the validation middleware



// User Authentication
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);


// Create a new blog post
router.post('/blogs', authMiddleware.authenticateUser, authorizationMiddleware.authorizeUser, blogController.createBlog);



// Get all blog posts
router.get('/blogs', blogController.getAllBlogs);

// Get a specific blog post by Title
router.get('/blogs/:title', blogController.getBlogByTitle);

// Update a blog post
router.put('/blogs', authMiddleware.authenticateUser, authorizationMiddleware.authorizeUser, blogController.updateBlog);


// Delete a blog post
router.delete('/blogs', authMiddleware.authenticateUser, authorizationMiddleware.authorizeUser, blogController.deleteBlog);


// Route for creating a comment (requires authentication and authorization)
router.post('/comments', authMiddleware.authenticateUser, authorizationMiddleware.authorizeUser,validationMiddleware.validateCommentInput, commentController.createComment);

// Route for updating a comment (requires authentication and authorization)
router.put('/comments/:id', authMiddleware.authenticateUser, authorizationMiddleware.authorizeUser,validationMiddleware.validateCommentInput, commentController.updateComment);

// Route for deleting a comment (requires authentication and authorization)
router.delete('/comments/:id', authMiddleware.authenticateUser, authorizationMiddleware.authorizeUser, commentController.deleteComment);


// Logout User
router.post('/logout', authController.logoutUser);

module.exports = router;