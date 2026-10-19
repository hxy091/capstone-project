import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { API_URL } from '../config.js';

function BlogDetail() {
  const { id } = useParams();
  const { user, token } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [commentBody, setCommentBody] = useState('');
  const [commentError, setCommentError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${API_URL}/api/blog/${id}`);
        if (!res.ok) throw new Error('Failed to load post');
        const data = await res.json();
        setPost(data.post);
        setComments(data.comments);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setCommentError('');
    try {
      const res = await fetch(`${API_URL}/api/blog/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ body: commentBody }),
      });
      if (!res.ok) throw new Error('Failed to post comment');
      const newComment = await res.json();
      setComments([newComment, ...comments]);
      setCommentBody('');
    } catch (err) {
      setCommentError(err.message);
    }
  };

  if (loading) return <div className="loading">Loading post...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div className="blog-detail">
      <h1>{post.title}</h1>
      <p className="blog-meta">
        By {post.author?.username} &middot; {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className="blog-content">{post.content}</div>

      <div className="comment-list">
        <h3>Comments ({comments.length})</h3>

        {user ? (
          <form onSubmit={handleCommentSubmit} style={{ marginBottom: '1.5rem' }}>
            {commentError && <div className="alert alert-error">{commentError}</div>}
            <div className="form-group">
              <textarea
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                placeholder="Write a comment..."
                required
              />
            </div>
            <button type="submit" className="btn">Post Comment</button>
          </form>
        ) : (
          <p className="blog-meta">Please log in to leave a comment.</p>
        )}

        {comments.map((c) => (
          <div key={c._id} className="comment-item">
            <div className="comment-author">{c.author?.username || 'Unknown'}</div>
            <div className="comment-date">{new Date(c.createdAt).toLocaleString()}</div>
            <div className="comment-body">{c.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogDetail;
