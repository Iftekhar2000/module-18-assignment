import /* React, */ { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SingleBlog() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const response = await axios.get(`/api/v1/blogs/${blogId}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    }

    fetchBlog();
  }, [blogId]);

  return (
    <div>
      <h2>{blog?.title}</h2>
      <p>{blog?.content}</p>
      <p>Author: {blog?.author}</p>
      <p>Tags: {blog?.tags.join(', ')}</p>
      {/* Add comments section here */}
    </div>
  );
}

export default SingleBlog;
