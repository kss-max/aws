import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

export default function AdminRegistrations() {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');

    useEffect(() => {
        API.get('/admin/registrations')
            .then(r => setRegistrations(r.data))
            .catch(() => setError('Could not load registrations.'))
            .finally(() => setLoading(false));
    }, []);

    const filtered = registrations.filter(r =>
        r.name?.toLowerCase().includes(search.toLowerCase()) ||
        r.email?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <main className="page">
            <header className="page-header">
                <p className="eyebrow">Admin</p>
                <h1>Registrations</h1>
                <div className="gold-rule" />
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    {registrations.length} total registration{registrations.length !== 1 ? 's' : ''}
                </p>
            </header>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
                <input
                    type="search"
                    placeholder="Search by name or email…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ maxWidth: 320 }}
                />
                <Link to="/admin/create" className="btn btn-primary">+ New Event</Link>
            </div>

            {loading && <div className="loading">Loading registrations</div>}
            {error && <div className="alert alert-error">{error}</div>}

            {!loading && !error && filtered.length === 0 && (
                <div className="empty">
                    <h3>{search ? 'No results' : 'No registrations yet'}</h3>
                    <p>{search ? 'Try a different search term.' : 'Registrations will appear here once students sign up.'}</p>
                </div>
            )}

            {!loading && !error && filtered.length > 0 && (
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Event</th>
                                <th>Registered</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((reg, i) => (
                                <tr key={reg._id}>
                                    <td style={{ color: 'var(--text-dim)', fontVariantNumeric: 'tabular-nums' }}>{i + 1}</td>
                                    <td>{reg.name}</td>
                                    <td style={{ color: 'var(--text-muted)' }}>{reg.email}</td>
                                    <td>
                                        {reg.eventId ? (
                                            <Link to={`/events/${reg.eventId}`} style={{ color: 'var(--gold)', fontSize: '0.78rem' }}>
                                                {reg.eventTitle || reg.eventId}
                                            </Link>
                                        ) : '—'}
                                    </td>
                                    <td style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                                        {reg.createdAt ? new Date(reg.createdAt).toLocaleDateString('en-GB') : '—'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </main>
    );
}
