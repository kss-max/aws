import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import Nav from '../components/Nav';

export default function EventList() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        API.get('/events')
            .then(r => setEvents(r.data))
            .catch(() => setError('Could not load events. Is the backend running?'))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <Nav />
            <main className="page">
                <header className="page-header">
                    <p className="eyebrow">Campus Events</p>
                    <h1>EventSphere</h1>
                    <div className="gold-rule" />
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: 500 }}>
                        Browse and register for upcoming campus events, workshops, and seminars.
                    </p>
                </header>

                {loading && <div className="loading">Fetching events</div>}

                {error && (
                    <div className="alert alert-error">{error}</div>
                )}

                {!loading && !error && events.length === 0 && (
                    <div className="empty">
                        <h3>No events yet</h3>
                        <p>Check back soon or ask your admin to create one.</p>
                    </div>
                )}

                {!loading && !error && events.length > 0 && (
                    <div className="grid">
                        {events.map((event, i) => (
                            <article
                                key={event._id}
                                className={`card stagger-${Math.min(i + 1, 6)}`}
                                style={{ animationDelay: `${i * 0.06}s` }}
                            >
                                <div className="badge">{event.category || 'Event'}</div>
                                <div className="card-meta" style={{ marginTop: '0.75rem' }}>
                                    <span data-icon="📅">{event.date ? new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'TBD'}</span>
                                    <span data-icon="📍">{event.location || 'TBD'}</span>
                                </div>
                                <h3>{event.title}</h3>
                                <p>{event.description?.slice(0, 100)}{event.description?.length > 100 ? '…' : ''}</p>
                                <Link to={`/events/${event._id}`} className="card-link">View details →</Link>
                            </article>
                        ))}
                    </div>
                )}
            </main>
        </>
    );
}
