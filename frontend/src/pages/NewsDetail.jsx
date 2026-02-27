import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../api';
import Nav from '../components/Nav';
import { useAuth } from '../context/AuthContext';

export default function NewsDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deleting, setDeleting] = useState(false);
    const { isAdmin } = useAuth();

    useEffect(() => {
        API.get(`/news/${id}`)
            .then(r => setNews(r.data))
            .catch(() => setError('News post not found.'))
            .finally(() => setLoading(false));
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm('Delete this news post? This cannot be undone.')) return;
        setDeleting(true);
        try {
            await API.delete(`/news/${id}`);
            navigate('/news');
        } catch {
            alert('Failed to delete. Please try again.');
            setDeleting(false);
        }
    };

    return (
        <>
            <Nav />
            <main className="page-sm">
                {loading && <div className="loading">Loading…</div>}
                {error && <div className="alert alert-error">{error}</div>}

                {news && (
                    <>
                        {/* Top action bar */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                            <Link to="/news" className="btn btn-outline">← Back to News</Link>

                            {/* Admin actions */}
                            {isAdmin && (
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <Link
                                        to={`/admin/news/edit/${news._id}`}
                                        className="btn btn-outline"
                                        style={{ fontSize: '0.82rem' }}
                                    >
                                        ✏️ Edit Post
                                    </Link>
                                    <button
                                        className="btn"
                                        style={{ background: 'var(--error, #e53e3e)', color: '#fff', border: 'none', fontSize: '0.82rem' }}
                                        onClick={handleDelete}
                                        disabled={deleting}
                                    >
                                        {deleting ? 'Deleting…' : '🗑 Delete'}
                                    </button>
                                </div>
                            )}
                        </div>

                        {news.image && (
                            <img
                                src={news.image}
                                alt={news.title}
                                style={{ width: '100%', maxHeight: '320px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1.5rem' }}
                            />
                        )}

                        <header className="page-header">
                            <div className="badge">
                                {news.eventId ? 'Event Update' : 'Announcement'}
                            </div>
                            <h1 style={{ marginTop: '0.75rem' }}>{news.title}</h1>
                            <div className="gold-rule" />
                            <div className="card-meta">
                                <span data-icon="📅">
                                    {new Date(news.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </span>
                                {news.publishedBy && (
                                    <span data-icon="✍️">{news.publishedBy.name}</span>
                                )}
                                {news.eventId && (
                                    <span data-icon="🎯">Related: {news.eventId.title}</span>
                                )}
                            </div>
                        </header>

                        <p style={{ lineHeight: '1.8', marginTop: '1.5rem', whiteSpace: 'pre-line' }}>
                            {news.content}
                        </p>

                        {/* Related event quick-link */}
                        {news.eventId && (
                            <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid var(--border)', borderRadius: '8px' }}>
                                <p className="eyebrow" style={{ marginBottom: '0.4rem' }}>Related Event</p>
                                <Link
                                    to={`/events/${news.eventId._id}`}
                                    className="btn btn-outline"
                                    style={{ display: 'inline-block' }}
                                >
                                    View {news.eventId.title} →
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </main>
        </>
    );
}
