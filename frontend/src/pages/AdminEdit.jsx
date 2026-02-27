import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../api';

export default function AdminEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ title: '', description: '', date: '', venue: '', location: '', category: '', capacity: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [serverErr, setServerErr] = useState('');

    useEffect(() => {
        API.get(`/events/${id}`)
            .then(r => {
                const e = r.data;
                setForm({
                    title: e.title || '',
                    description: e.description || '',
                    date: e.date ? e.date.slice(0, 16) : '',
                    venue: e.venue || '',
                    location: e.location || '',
                    category: e.category || '',
                    capacity: e.capacity || '',
                });
            })
            .catch(() => setServerErr('Could not load event data.'))
            .finally(() => setLoading(false));
    }, [id]);

    const validate = () => {
        const e = {};
        if (!form.title.trim()) e.title = 'Title is required';
        if (!form.date) e.date = 'Date is required';
        if (!form.venue.trim()) e.venue = 'Venue is required';
        return e;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setSaving(true); setServerErr('');
        try {
            await API.put(`/events/${id}`, form);
            navigate('/');
        } catch (err) {
            setServerErr(err.response?.data?.message || 'Failed to update event.');
            setSaving(false);
        }
    };

    const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this event? This action cannot be undone.')) return;
        setSaving(true); setServerErr('');
        try {
            await API.delete(`/events/${id}`);
            navigate('/admin/registrations');
        } catch (err) {
            setServerErr(err.response?.data?.message || 'Failed to delete event.');
            setSaving(false);
        }
    };

    if (loading) return <><div className="loading">Loading event</div></>;

    return (
        <main className="page-sm">
            <header className="page-header">
                <p className="eyebrow">Admin</p>
                <h1>Edit Event</h1>
                <div className="gold-rule" />
            </header>

            {serverErr && <div className="alert alert-error">{serverErr}</div>}

            <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <label htmlFor="title">Event Title *</label>
                    <input id="title" type="text" value={form.title} onChange={set('title')} className={errors.title ? 'error' : ''} />
                    {errors.title && <span className="error-msg">{errors.title}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" value={form.description} onChange={set('description')} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                    <div className="form-group">
                        <label htmlFor="date">Date *</label>
                        <input id="date" type="datetime-local" value={form.date} onChange={set('date')} className={errors.date ? 'error' : ''} />
                        {errors.date && <span className="error-msg">{errors.date}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="capacity">Capacity</label>
                        <input id="capacity" type="number" value={form.capacity} onChange={set('capacity')} min="1" />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                    <div className="form-group">
                        <label htmlFor="venue">Venue (Building/Campus) *</label>
                        <input id="venue" type="text" value={form.venue} onChange={set('venue')} className={errors.venue ? 'error' : ''} />
                        {errors.venue && <span className="error-msg">{errors.venue}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Room / Exact Location</label>
                        <input id="location" type="text" value={form.location} onChange={set('location')} />
                    </div>
                </div>

                <div className="form-group" style={{ marginTop: '1.25rem' }}>
                    <label htmlFor="category">Category</label>
                    <select id="category" value={form.category} onChange={set('category')}>
                        <option value="">Select…</option>
                        <option>Workshop</option>
                        <option>Seminar</option>
                        <option>Cultural</option>
                        <option>Sports</option>
                        <option>Tech</option>
                        <option>Other</option>
                    </select>
                </div>

                <hr className="divider" />

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button type="submit" className="btn btn-primary" disabled={saving}>
                            {saving ? 'Saving…' : 'Save Changes'}
                        </button>
                        <Link to="/admin/registrations" className="btn btn-outline">Cancel</Link>
                    </div>
                    <button type="button" onClick={handleDelete} className="btn btn-outline" style={{ color: '#ff4d4d', borderColor: 'rgba(255, 77, 77, 0.2)' }} disabled={saving}>
                        Delete Event
                    </button>
                </div>
            </form>
        </main>
    );
}
