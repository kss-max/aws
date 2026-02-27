import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';

export default function AdminCreate() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ title: '', description: '', date: '', venue: '', location: '', category: '', capacity: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [serverErr, setServerErr] = useState('');

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
        setLoading(true); setServerErr('');
        try {
            await API.post('/events', form);
            navigate('/admin/registrations');
        } catch (err) {
            setServerErr(err.response?.data?.message || 'Failed to create event.');
            setLoading(false);
        }
    };

    const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

    return (
        <main className="page-sm">
            <header className="page-header">
                <p className="eyebrow">Admin</p>
                <h1>Create Event</h1>
                <div className="gold-rule" />
            </header>

            {serverErr && <div className="alert alert-error">{serverErr}</div>}

            <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <label htmlFor="title">Event Title *</label>
                    <input id="title" type="text" placeholder="Annual Tech Symposium" value={form.title} onChange={set('title')} className={errors.title ? 'error' : ''} />
                    {errors.title && <span className="error-msg">{errors.title}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" placeholder="What's this event about?" value={form.description} onChange={set('description')} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                    <div className="form-group">
                        <label htmlFor="date">Date *</label>
                        <input id="date" type="datetime-local" value={form.date} onChange={set('date')} className={errors.date ? 'error' : ''} />
                        {errors.date && <span className="error-msg">{errors.date}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="capacity">Capacity</label>
                        <input id="capacity" type="number" placeholder="100" value={form.capacity} onChange={set('capacity')} min="1" />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                    <div className="form-group">
                        <label htmlFor="venue">Venue (Building/Campus) *</label>
                        <input id="venue" type="text" placeholder="Main Campus" value={form.venue} onChange={set('venue')} className={errors.venue ? 'error' : ''} />
                        {errors.venue && <span className="error-msg">{errors.venue}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Room / Exact Location</label>
                        <input id="location" type="text" placeholder="Auditorium A" value={form.location} onChange={set('location')} />
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

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Creating…' : 'Create Event'}
                    </button>
                    <Link to="/admin/registrations" className="btn btn-outline">Cancel</Link>
                </div>
            </form>
        </main >
    );
}
