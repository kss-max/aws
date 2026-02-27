import { useState, useEffect } from 'react';
import API from '../api';

export default function AdminAnnouncements() {
    const [announcements, setAnnouncements] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchAnnouncements = async () => {
        try {
            const res = await API.get('/announcements');
            setAnnouncements(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            setError('Please fill out both title and content.');
            return;
        }

        try {
            await API.post('/announcements/admin', { title, content });
            setTitle('');
            setContent('');
            setError('');
            fetchAnnouncements(); // Refresh list
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to post announcement.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this announcement?")) return;

        try {
            await API.delete(`/announcements/admin/${id}`);
            fetchAnnouncements();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className="admin-header">
                <div>
                    <h1 style={{ fontSize: '1.8rem', marginBottom: '0.2rem' }}>Announcements</h1>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>Post updates or alerts for students</p>
                </div>
            </div>

            <main className="admin-content">
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem' }}>
                    {/* Post Form */}
                    <div className="card" style={{ padding: '1.5rem', alignSelf: 'start' }}>
                        <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>New Announcement</h2>
                        {error && <div className="alert alert-error" style={{ marginBottom: '1rem' }}>{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Welcome to the new semester!"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea
                                    rows="5"
                                    placeholder="Important details go here..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                Post Announcement
                            </button>
                        </form>
                    </div>

                    {/* Manage List */}
                    <div>
                        <h2 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Recent Announcements</h2>
                        {loading ? (
                            <p style={{ color: 'var(--text-muted)' }}>Loading…</p>
                        ) : announcements.length === 0 ? (
                            <div className="card" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
                                <p style={{ color: 'var(--text-dim)' }}>No announcements posted yet.</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {announcements.map((ann) => (
                                    <div key={ann._id} className="card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                                        <div>
                                            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--gold)' }}>{ann.title}</h3>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem', whiteSpace: 'pre-wrap' }}>{ann.content}</p>
                                            <p style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>
                                                {new Date(ann.date).toLocaleString([], { dateStyle: 'long', timeStyle: 'short' })}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(ann._id)}
                                            className="btn btn-outline"
                                            style={{ color: 'var(--red)', borderColor: 'rgba(239, 68, 68, 0.2)', padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}
