import { Link, useNavigate } from 'react-router-dom';

export default function Nav() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userRole = JSON.parse(localStorage.getItem('user') || '{}').role;

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/');
    };

    return (
        <nav className="nav">
            <Link to="/" className="nav-brand">EventSphere</Link>
            <ul className="nav-links">
                <li><Link to="/events">Events</Link></li>
                {token ? (
                    <>
                        {userRole === 'admin' && <li><Link to="/admin/registrations" style={{ color: 'var(--gold)' }}>Dashboard</Link></li>}
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
