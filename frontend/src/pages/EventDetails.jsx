import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api';
import Nav from '../components/Nav';

export default function EventDetails() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        API.get(`/events/${id}`)
            .then(r => setEvent(r.data))
            .catch(() => setError('Event not found or server unavailable.'))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <><Nav /><div className="loading">Loading event</div></>;
    if (error) return <><Nav /><div className="page"><div className="alert alert-error">{error}</div><Link to="/" className="btn btn-outline">← Back to events</Link></div></>;

    return (
        <>
            <Nav />
            <main className="page-sm" style={{ maxWidth: 780, paddingTop: '2.5rem' }}>
                <Link to="/" style={{ fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    ← All Events
                </Link>

                <div style={{ marginTop: '1.75rem' }}>
                    <div className="badge">{event.category || 'Event'}</div>
                    <h1 style={{ marginTop: '0.75rem', marginBottom: 0 }}>{event.title}</h1>
                    <div className="gold-rule" />
                </div>

                <div className="detail-meta">
                    <div className="detail-meta-item">
                        <span className="meta-label">Date</span>
                        <span className="meta-value">
                            {event.date ? new Date(event.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : 'TBD'}
                        </span>
                    </div>
                    <div className="detail-meta-item">
                        <span className="meta-label">Location</span>
                        <span className="meta-value">{event.location || 'TBD'}</span>
                    </div>
                    {event.capacity && (
                        <div className="detail-meta-item">
                            <span className="meta-label">Capacity</span>
                            <span className="meta-value">{event.capacity} seats</span>
                        </div>
                    )}
                </div>

                <p className="detail-description">{event.description || 'No description provided.'}</p>

                <Link to={`/register?eventId=${event._id}&title=${encodeURIComponent(event.title)}`} className="btn btn-primary">
                    Register for this event →
                </Link>
            </main>
        </>
    );
}
