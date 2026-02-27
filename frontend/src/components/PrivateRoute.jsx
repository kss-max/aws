import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * PrivateRoute – allows any authenticated user.
 * Unauthenticated users are redirected to /login.
 */
export default function PrivateRoute() {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}
