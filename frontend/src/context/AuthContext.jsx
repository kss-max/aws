import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try { return JSON.parse(localStorage.getItem('user')) || null; }
        catch { return null; }
    });

    const [token, setToken] = useState(() => localStorage.getItem('token') || null);

    const login = useCallback((userData) => {
        localStorage.setItem('token', userData.token);
        localStorage.setItem('user', JSON.stringify(userData));
        if (userData.role === 'admin') {
            localStorage.setItem('adminToken', userData.token);
        }
        setToken(userData.token);
        setUser(userData);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        setToken(null);
        setUser(null);
    }, []);

    const isAdmin = user?.role === 'admin';
    const isLoggedIn = Boolean(token);

    return (
        <AuthContext.Provider value={{ user, token, isAdmin, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
