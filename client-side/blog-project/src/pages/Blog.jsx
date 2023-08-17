import /* React,  */{ useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';
//import BlogItem from './BlogItem';

function Blog() {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/v1/blogs');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <h1>Welcome to My Blog App</h1>
      <div>
        <h2>All Blogs</h2>
        <div className="blog-card-container">
          {blogs.map((blog) => (
            <div key={blog._id} className="blog-card">
              <h3>{blog.title}</h3>
              <p>{blog.content}</p>
              <p>Author: {blog.author}</p>
              <Link to={`/blog/${blog._id}`}>Read More</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
