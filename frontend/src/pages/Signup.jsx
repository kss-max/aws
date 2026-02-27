import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';
import Nav from '../components/Nav';

export default function Signup() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.password) {
            setError('Please fill in all required fields.');
            return;
        }
        setError('');
        setLoading(true);

        try {
            const res = await API.post('/auth/register', form);
            // Backend returns: { _id, name, email, role, token }
            const user = res.data;
            localStorage.setItem('token', user.token);
            localStorage.setItem('user', JSON.stringify(user));

            if (user.role === 'admin') {
                localStorage.setItem('adminToken', user.token);
                navigate('/admin/registrations');
            } else {
                navigate('/events');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create account.');
            setLoading(false);
        }
    };

    return (
        <>
            <Nav />
            <div style={{
                minHeight: 'calc(100vh - 61px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem',
                background: 'var(--bg)',
                position: 'relative'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '600px',
                    height: '400px',
                    background: 'radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />

                <main className="card" style={{ width: '100%', maxWidth: '420px', padding: '3rem 2rem', position: 'relative', zIndex: 1 }}>
                    <header style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>Account</p>
                        <h1 style={{ fontSize: '2rem' }}>Create Account</h1>
                        <div className="gold-rule" style={{ margin: '1rem auto 0' }} />
                    </header>

                    {error && <div className="alert alert-error" style={{ marginBottom: '1.5rem' }}>{error}</div>}

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label>I am a...</label>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', color: form.role === 'user' ? 'var(--gold)' : 'var(--text-muted)' }}>
                                    <input type="radio" name="role" value="user" checked={form.role === 'user'} onChange={(e) => setForm({ ...form, role: e.target.value })} />
                                    Student
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', color: form.role === 'admin' ? 'var(--gold)' : 'var(--text-muted)' }}>
                                    <input type="radio" name="role" value="admin" checked={form.role === 'admin'} onChange={(e) => setForm({ ...form, role: e.target.value })} />
                                    Organizer
                                </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Jane Doe"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className={error ? 'error' : ''}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="you@university.edu"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className={error ? 'error' : ''}
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: '2rem' }}>
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                className={error ? 'error' : ''}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1.5rem' }} disabled={loading}>
                            {loading ? 'Creating...' : 'Sign Up'}
                        </button>

                        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            Already have an account? <Link to="/login" style={{ color: 'var(--gold)', textDecoration: 'none' }}>Sign in</Link>
                        </p>
                    </form>
                </main>
            </div>
        </>
    );
}
