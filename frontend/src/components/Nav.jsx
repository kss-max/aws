import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Nav() {
    const navigate = useNavigate();
    const { user, isLoggedIn, isAdmin, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="nav">
            <Link to="/" className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                EventSphere
                {isLoggedIn && user?.name && (
                    <span style={{ fontSize: '0.6rem', padding: '0.1rem 0.4rem', border: '1px solid var(--gold)', borderRadius: '2px', color: 'var(--gold)' }}>
                        {user.name.toUpperCase()}
                    </span>
                )}
            </Link>
            <ul className="nav-links">
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/announcements">Announcements</Link></li>
                {isLoggedIn ? (
                    <>
                        {isAdmin && <li><Link to="/admin/registrations" style={{ color: 'var(--gold)' }}>Dashboard</Link></li>}
                        <li><button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit' }}>Logout</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login" style={{ color: 'var(--text-dim)' }}>Log in</Link></li>
                        <li><Link to="/signup" className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.75rem', marginLeft: '0.5rem' }}>Sign up</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
}
