import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';

export default function AdminNewsList() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchNews = () => {
        API.get('/news')
            .then(r => setNews(r.data))
            .catch(() => setError('Could not load news.'))
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchNews(); }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this news post?')) return;
        try {
            await API.delete(`/news/${id}`);
            setNews(prev => prev.filter(n => n._id !== id));
        } catch {
            alert('Failed to delete news post.');
        }
    };

    return (
        <main className="page">
            <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <p className="eyebrow">Admin</p>
                    <h1>Manage News</h1>
                    <div className="gold-rule" />
                </div>
                <button className="btn btn-primary" onClick={() => navigate('/admin/news/create')}>
                    + New Post
                </button>
            </header>

            {loading && <div className="loading">Loading news…</div>}
            {error && <div className="alert alert-error">{error}</div>}

            {!loading && !error && news.length === 0 && (
                <div className="empty">
                    <h3>No news posts yet</h3>
                    <p>Click "+ New Post" to create your first announcement.</p>
                </div>
            )}

            {!loading && !error && news.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {news.map((item) => (
                        <div key={item._id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                            <div style={{ flex: 1 }}>
                                <div className="badge" style={{ marginBottom: '0.4rem' }}>
                                    {item.eventId ? 'Event Update' : 'Announcement'}
                                </div>
                                <h3 style={{ margin: '0 0 0.25rem' }}>{item.title}</h3>
                                <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--text-muted)' }}>
                                    {new Date(item.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    {item.publishedBy && ` · ${item.publishedBy.name}`}
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <Link to={`/admin/news/edit/${item._id}`} className="btn btn-outline">
                                    Edit
                                </Link>
                                <button
                                    className="btn"
                                    style={{ background: 'var(--error, #e53e3e)', color: '#fff', border: 'none' }}
                                    onClick={() => handleDelete(item._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}
