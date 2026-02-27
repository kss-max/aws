import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import API from '../api';
import Nav from '../components/Nav';

export default function Register() {
    const [params] = useSearchParams();
    const eventId = params.get('eventId') || '';
    const eventTitle = params.get('title') || '';

    const [form, setForm] = useState({ name: '', email: '', phone: '', eventId });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [serverErr, setServerErr] = useState('');

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Name is required';
        if (!form.email.trim()) e.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
        if (!form.phone.trim()) e.phone = 'Phone number is required';
        if (!form.eventId) e.eventId = 'Event ID is required';
        return e;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setLoading(true); setServerErr('');
        try {
            await API.post('/register', form);
            setSuccess(true);
        } catch (err) {
            setServerErr(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) return (
        <>
            <Nav />
            <main className="page-sm">
                <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✦</div>
                    <h2 style={{ marginBottom: '0.5rem' }}>You&apos;re registered</h2>
                    <div className="gold-rule" style={{ margin: '1rem auto' }} />
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '2rem' }}>
                        Your spot for <strong style={{ color: 'var(--gold)' }}>{eventTitle || form.eventId}</strong> has been confirmed.
                    </p>
                    <Link to="/" className="btn btn-outline">← Browse more events</Link>
                </div>
            </main>
        </>
    );

    return (
        <>
            <Nav />
            <main className="page-sm">
                <header className="page-header">
                    <p className="eyebrow">Registration</p>
                    <h1>Reserve your spot</h1>
                    {eventTitle && <p style={{ color: 'var(--gold)', fontSize: '0.85rem', marginTop: '0.5rem' }}>{eventTitle}</p>}
                    <div className="gold-rule" />
                </header>

                {serverErr && <div className="alert alert-error">{serverErr}</div>}

                <form onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Jane Smith"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            className={errors.name ? 'error' : ''}
                        />
                        {errors.name && <span className="error-msg">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="jane@university.edu"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            className={errors.email ? 'error' : ''}
                        />
                        {errors.email && <span className="error-msg">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            id="phone"
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={form.phone}
                            onChange={e => setForm({ ...form, phone: e.target.value })}
                            className={errors.phone ? 'error' : ''}
                        />
                        {errors.phone && <span className="error-msg">{errors.phone}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="eventId">Event ID</label>
                        <input
                            id="eventId"
                            type="text"
                            placeholder="auto-filled from event page"
                            value={form.eventId}
                            onChange={e => setForm({ ...form, eventId: e.target.value })}
                            className={errors.eventId ? 'error' : ''}
                        />
                        {errors.eventId && <span className="error-msg">{errors.eventId}</span>}
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Submitting…' : 'Confirm Registration'}
                    </button>
                </form>
            </main>
        </>
    );
}
