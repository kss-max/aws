import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * AdminRoute – allows only authenticated admins.
 * Non-admin or unauthenticated users are redirected to /login.
 */
export default function AdminRoute() {
    const { isLoggedIn, isAdmin } = useAuth();
    if (!isLoggedIn) return <Navigate to="/login" replace />;
    if (!isAdmin) return <Navigate to="/login" replace />;
    return <Outlet />;
}
