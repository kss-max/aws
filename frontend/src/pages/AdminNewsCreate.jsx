import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import API from '../api';

export default function AdminNewsCreate() {
    const navigate = useNavigate();
    const { id } = useParams(); // if editing
    const isEditing = Boolean(id);

    const [form, setForm] = useState({ title: '', content: '', image: '', eventId: '' });
    const [events, setEvents] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [serverErr, setServerErr] = useState('');

    // Load events for the dropdown
    useEffect(() => {
        API.get('/events').then(r => setEvents(r.data)).catch(() => { });
    }, []);

    // If editing, prefill form
    useEffect(() => {
        if (isEditing) {
            API.get(`/news/${id}`)
                .then(r => {
                    const n = r.data;
                    setForm({
                        title: n.title || '',
                        content: n.content || '',
                        image: n.image || '',
                        eventId: n.eventId?._id || '',
                    });
                })
                .catch(() => setServerErr('Could not load news post.'));
        }
    }, [id, isEditing]);

    const validate = () => {
        const e = {};
        if (!form.title.trim()) e.title = 'Title is required';
        if (!form.content.trim()) e.content = 'Content is required';
        return e;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setLoading(true); setServerErr('');

        const payload = {
            title: form.title,
            content: form.content,
            image: form.image || undefined,
            eventId: form.eventId || undefined,
        };

        try {
            if (isEditing) {
                await API.put(`/news/${id}`, payload);
            } else {
                await API.post('/news', payload);
            }
            navigate('/admin/news');
        } catch (err) {
            setServerErr(err.response?.data?.message || 'Failed to save news post.');
            setLoading(false);
        }
    };

    const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

    return (
        <main className="page-sm">
            <header className="page-header">
                <p className="eyebrow">Admin</p>
                <h1>{isEditing ? 'Edit News Post' : 'Create News Post'}</h1>
                <div className="gold-rule" />
            </header>

            {serverErr && <div className="alert alert-error">{serverErr}</div>}

            <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <label htmlFor="news-title">Title *</label>
                    <input
                        id="news-title"
                        type="text"
                        placeholder="Tech Fest Date Announced!"
                        value={form.title}
                        onChange={set('title')}
                        className={errors.title ? 'error' : ''}
                    />
                    {errors.title && <span className="error-msg">{errors.title}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="news-content">Content *</label>
                    <textarea
                        id="news-content"
                        placeholder="Write the full news update here…"
                        value={form.content}
                        onChange={set('content')}
                        rows={6}
                        className={errors.content ? 'error' : ''}
                    />
                    {errors.content && <span className="error-msg">{errors.content}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="news-image">Image URL (optional)</label>
                    <input
                        id="news-image"
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        value={form.image}
                        onChange={set('image')}
                    />
                    {form.image && (
                        <img
                            src={form.image}
                            alt="Preview"
                            style={{ marginTop: '0.5rem', width: '100%', maxHeight: '180px', objectFit: 'cover', borderRadius: '8px' }}
                            onError={e => e.target.style.display = 'none'}
                        />
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="news-event">Related Event (optional)</label>
                    <select id="news-event" value={form.eventId} onChange={set('eventId')}>
                        <option value="">None</option>
                        {events.map(ev => (
                            <option key={ev._id} value={ev._id}>{ev.title}</option>
                        ))}
                    </select>
                </div>

                <hr className="divider" />

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Saving…' : isEditing ? 'Update Post' : 'Publish Post'}
                    </button>
                    <Link to="/admin/news" className="btn btn-outline">Cancel</Link>
                </div>
            </form>
        </main>
    );
}
