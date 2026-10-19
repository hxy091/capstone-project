import { useState, useEffect } from 'react';
import BlogPostCard from '../components/BlogPostCard.jsx';
import { API_URL } from '../config.js';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/blog`);
        if (!res.ok) throw new Error('Failed to load blog posts');
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <div className="loading">Loading blog...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div>
      <h1>Blog</h1>
      <div className="grid">
        {posts.map((p) => (
          <BlogPostCard key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}

export default Blog;
