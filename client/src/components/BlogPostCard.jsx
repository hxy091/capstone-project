import { Link } from 'react-router-dom';

function BlogPostCard({ post }) {
  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">{post.title}</h3>
        <p className="card-text">{post.content.substring(0, 120)}...</p>
        <p className="card-text">By {post.author?.username || 'Unknown'} &middot; {new Date(post.createdAt).toLocaleDateString()}</p>
      </div>
      <div className="card-links">
        <Link to={`/blog/${post._id}`}>Read More</Link>
      </div>
    </div>
  );
}

export default BlogPostCard;
