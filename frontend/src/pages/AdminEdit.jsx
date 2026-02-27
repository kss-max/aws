import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../api';

export default function AdminEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ title: '', description: '', date: '', location: '', category: '', capacity: '' });
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
        if (!form.location.trim()) e.location = 'Location is required';
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
                        <label htmlFor="location">Location *</label>
                        <input id="location" type="text" value={form.location} onChange={set('location')} className={errors.location ? 'error' : ''} />
                        {errors.location && <span className="error-msg">{errors.location}</span>}
                    </div>
                    <div className="form-group">
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
                </div>

                <hr className="divider" />

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="submit" className="btn btn-primary" disabled={saving}>
                        {saving ? 'Saving…' : 'Save Changes'}
                    </button>
                    <Link to="/" className="btn btn-outline">Cancel</Link>
                </div>
            </form>
        </main>
    );
}
