import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { API_URL } from '../config.js';

function Admin() {
  const { token } = useAuth();
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Project form
  const [pForm, setPForm] = useState({ title: '', description: '', imageUrl: '', repoUrl: '', liveUrl: '' });
  const [editingProjectId, setEditingProjectId] = useState(null);

  // Blog form
  const [bForm, setBForm] = useState({ title: '', content: '' });
  const [editingPostId, setEditingPostId] = useState(null);

  const authHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const fetchData = async () => {
    try {
      const [pRes, bRes] = await Promise.all([
        fetch(`${API_URL}/api/projects`),
        fetch(`${API_URL}/api/blog`),
      ]);
      setProjects(await pRes.json());
      setPosts(await bRes.json());
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingProjectId ? `${API_URL}/api/projects/${editingProjectId}` : `${API_URL}/api/projects`;
      const method = editingProjectId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: authHeaders, body: JSON.stringify(pForm) });
      if (!res.ok) throw new Error('Failed to save project');
      setPForm({ title: '', description: '', imageUrl: '', repoUrl: '', liveUrl: '' });
      setEditingProjectId(null);
      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleProjectDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await fetch(`${API_URL}/api/projects/${id}`, { method: 'DELETE', headers: authHeaders });
      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleProjectEdit = (p) => {
    setPForm({ title: p.title, description: p.description, imageUrl: p.imageUrl || '', repoUrl: p.repoUrl || '', liveUrl: p.liveUrl || '' });
    setEditingProjectId(p._id);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingPostId ? `${API_URL}/api/blog/${editingPostId}` : `${API_URL}/api/blog`;
      const method = editingPostId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: authHeaders, body: JSON.stringify(bForm) });
      if (!res.ok) throw new Error('Failed to save post');
      setBForm({ title: '', content: '' });
      setEditingPostId(null);
      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePostDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await fetch(`${API_URL}/api/blog/${id}`, { method: 'DELETE', headers: authHeaders });
      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePostEdit = (p) => {
    setBForm({ title: p.title, content: p.content });
    setEditingPostId(p._id);
  };

  if (loading) return <div className="loading">Loading admin dashboard...</div>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {error && <div className="alert alert-error">{error}</div>}

      {/* Manage Projects */}
      <section className="admin-section">
        <h2>{editingProjectId ? 'Edit Project' : 'Add New Project'}</h2>
        <form onSubmit={handleProjectSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input value={pForm.title} onChange={(e) => setPForm({ ...pForm, title: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={pForm.description} onChange={(e) => setPForm({ ...pForm, description: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input value={pForm.imageUrl} onChange={(e) => setPForm({ ...pForm, imageUrl: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Repo URL</label>
            <input value={pForm.repoUrl} onChange={(e) => setPForm({ ...pForm, repoUrl: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Live URL</label>
            <input value={pForm.liveUrl} onChange={(e) => setPForm({ ...pForm, liveUrl: e.target.value })} />
          </div>
          <button type="submit" className="btn">{editingProjectId ? 'Update Project' : 'Add Project'}</button>
          {editingProjectId && (
            <button type="button" className="btn btn-outline" onClick={() => { setEditingProjectId(null); setPForm({ title: '', description: '', imageUrl: '', repoUrl: '', liveUrl: '' }); }}>Cancel</button>
          )}
        </form>

        <h3 style={{ marginTop: '2rem' }}>All Projects</h3>
        {projects.map((p) => (
          <div key={p._id} className="admin-item">
            <div className="admin-item-info">
              <h4>{p.title}</h4>
              <p>{p.description.substring(0, 80)}...</p>
            </div>
            <div className="admin-item-actions">
              <button className="btn btn-sm" onClick={() => handleProjectEdit(p)}>Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => handleProjectDelete(p._id)}>Delete</button>
            </div>
          </div>
        ))}
      </section>

      {/* Manage Blog */}
      <section className="admin-section">
        <h2>{editingPostId ? 'Edit Blog Post' : 'Write New Blog Post'}</h2>
        <form onSubmit={handlePostSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input value={bForm.title} onChange={(e) => setBForm({ ...bForm, title: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea style={{ minHeight: '200px' }} value={bForm.content} onChange={(e) => setBForm({ ...bForm, content: e.target.value })} required />
          </div>
          <button type="submit" className="btn">{editingPostId ? 'Update Post' : 'Publish Post'}</button>
          {editingPostId && (
            <button type="button" className="btn btn-outline" onClick={() => { setEditingPostId(null); setBForm({ title: '', content: '' }); }}>Cancel</button>
          )}
        </form>

        <h3 style={{ marginTop: '2rem' }}>All Blog Posts</h3>
        {posts.map((p) => (
          <div key={p._id} className="admin-item">
            <div className="admin-item-info">
              <h4>{p.title}</h4>
              <p>{p.content.substring(0, 80)}...</p>
            </div>
            <div className="admin-item-actions">
              <button className="btn btn-sm" onClick={() => handlePostEdit(p)}>Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => handlePostDelete(p._id)}>Delete</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Admin;
