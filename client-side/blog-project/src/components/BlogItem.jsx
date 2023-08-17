//import React from 'react';
import PropTypes from 'prop-types';

function BlogItem({ title, content, author, image }) {
  return (
    <div className="blog-item">
      <h3>{title}</h3>
      <p>{content}</p>
      <p>Author: {author}</p>
      <img src={image} alt={`Image for ${title}`} />
    </div>
  );
}

BlogItem.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default BlogItem;
