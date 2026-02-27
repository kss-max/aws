import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';
import Nav from '../components/Nav';
import { useAuth } from '../context/AuthContext';

export default function NewsList() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { isAdmin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        API.get('/news')
            .then(r => setNews(r.data))
            .catch(() => setError('Could not load news. Is the backend running?'))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <Nav />
            <main className="page">
                <header className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <p className="eyebrow">Latest Updates</p>
                        <h1>News &amp; Announcements</h1>
                        <div className="gold-rule" />
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: 500 }}>
                            Stay up to date with the latest event news and campus announcements.
                        </p>
                    </div>
                    {/* Admin: quick link to create a post */}
                    {isAdmin && (
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate('/admin/news/create')}
                            style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}
                        >
                            + New Post
                        </button>
                    )}
                </header>

                {loading && <div className="loading">Fetching news…</div>}
                {error && <div className="alert alert-error">{error}</div>}

                {!loading && !error && news.length === 0 && (
                    <div className="empty">
                        <h3>No news yet</h3>
                        <p>Check back soon for the latest updates.</p>
                    </div>
                )}

                {!loading && !error && news.length > 0 && (
                    <div className="grid">
                        {news.map((item, i) => (
                            <article
                                key={item._id}
                                className={`card stagger-${Math.min(i + 1, 6)}`}
                                style={{ animationDelay: `${i * 0.06}s`, position: 'relative' }}
                            >
                                {item.image && (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.75rem' }}
                                    />
                                )}
                                <div className="badge">
                                    {item.eventId ? 'Event Update' : 'Announcement'}
                                </div>
                                <div className="card-meta" style={{ marginTop: '0.75rem' }}>
                                    <span data-icon="📅">
                                        {new Date(item.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </span>
                                    {item.publishedBy && (
                                        <span data-icon="✍️">{item.publishedBy.name}</span>
                                    )}
                                </div>
                                <h3>{item.title}</h3>
                                <p>{item.content?.slice(0, 120)}{item.content?.length > 120 ? '…' : ''}</p>

                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <Link to={`/news/${item._id}`} className="card-link">Read more →</Link>
                                    {/* Admin quick-edit buttons */}
                                    {isAdmin && (
                                        <>
                                            <Link
                                                to={`/admin/news/edit/${item._id}`}
                                                className="btn btn-outline"
                                                style={{ fontSize: '0.72rem', padding: '0.2rem 0.6rem' }}
                                            >
                                                Edit
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </main>
        </>
    );
}
