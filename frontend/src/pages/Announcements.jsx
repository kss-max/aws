import { useState, useEffect } from 'react';
import API from '../api';
import Nav from '../components/Nav';

export default function Announcements() {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const res = await API.get('/announcements');
                setAnnouncements(res.data);
            } catch (err) {
                console.error(err);
                setError('Failed to load announcements.');
            } finally {
                setLoading(false);
            }
        };
        fetchAnnouncements();
    }, []);

    return (
        <>
            <Nav />
            <div style={{ padding: '6rem 1.5rem', minHeight: 'calc(100vh - 61px)', background: 'var(--bg)' }}>
                <div style={{ maxWidth: 700, margin: '0 auto' }}>
                    <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>Campus Updates</p>
                        <h1 style={{ fontSize: '2.5rem' }}>Announcements</h1>
                        <div className="gold-rule" style={{ margin: '1rem auto' }} />
                        <p style={{ color: 'var(--text-muted)' }}>Stay informed with the latest alerts from event organizers.</p>
                    </header>

                    {error && <div className="alert alert-error">{error}</div>}

                    {loading ? (
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            <div className="card skeleton" style={{ height: 120 }}></div>
                            <div className="card skeleton" style={{ height: 120 }}></div>
                            <div className="card skeleton" style={{ height: 120 }}></div>
                        </div>
                    ) : announcements.length === 0 ? (
                        <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '1rem', opacity: 0.5 }}>📭</div>
                            <h3 style={{ marginBottom: '0.5rem' }}>All caught up</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>There are no recent announcements right now.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {announcements.map((ann) => (
                                <article key={ann._id} className="card" style={{ padding: '2rem' }}>
                                    <header style={{ marginBottom: '1.5rem' }}>
                                        <h2 style={{ fontSize: '1.3rem', color: 'var(--gold)', marginBottom: '0.5rem' }}>{ann.title}</h2>
                                        <time style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>
                                            {// Formatting date like "August 24, 2024 at 10:30 AM"
                                                new Date(ann.date).toLocaleString([], { dateStyle: 'long', timeStyle: 'short' })}
                                        </time>
                                    </header>
                                    <div style={{ color: 'var(--text)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                                        {ann.content}
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
