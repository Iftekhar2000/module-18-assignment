//import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function BlogCard({ blog }) {
  return (
    <div className="blog-card">
      <h3>{blog.title}</h3>
      <p>{blog.content}</p>
      <p>Author: {blog.author}</p>
      <img src={blog.image} alt={`Image for ${blog.title}`} />
      <Link to={`/blog/${blog._id}`}>Read More</Link>
    </div>
  );
}

BlogCard.propTypes = {
  blog: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default BlogCard;
