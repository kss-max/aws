import { Link, Outlet, useNavigate, Navigate } from 'react-router-dom';

export default function AdminLayout() {
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // If not logged in, boot them to the login page
    if (!token) return <Navigate to="/login" replace />;

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
            {/* Admin specific Navigation */}
            <nav className="nav" style={{ borderBottomColor: 'var(--gold-dim)' }}>
                <Link to="/admin" className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    EventSphere <span style={{ fontSize: '0.6rem', padding: '0.1rem 0.4rem', border: '1px solid var(--gold)', borderRadius: '2px', color: 'var(--gold)' }}>{user.name ? user.name.toUpperCase() : 'ADMIN'}</span>
                </Link>
                <ul className="nav-links">
                    <li><Link to="/admin/registrations">Dashboard</Link></li>
                    <li><Link to="/admin/create">New Event</Link></li>
                    <li><Link to="/" style={{ color: 'var(--text-dim)' }}>View Site ↗</Link></li>
                    <li><button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'var(--red)', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit', textTransform: 'inherit' }}>Logout</button></li>
                </ul>
            </nav>

            {/* Admin Page Content */}
            <div style={{ flex: 1 }}>
                <Outlet />
            </div>
        </div>
    );
}
