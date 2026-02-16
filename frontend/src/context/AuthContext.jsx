/**
 * Authentication Context
 * =======================
 * Provides auth state and methods to the entire app.
 */

import { createContext, useContext, useState, useEffect } from 'react';
import { validateCredentials, saveSession, loadSession, clearSession } from '../utils/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Load session on mount
    useEffect(() => {
        const session = loadSession();
        if (session) {
            setUser(session.user);
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    // Login
    const login = (email, password) => {
        const validUser = validateCredentials(email, password);
        if (!validUser) {
            return { success: false, error: 'Invalid email or password' };
        }
        setUser(validUser);
        setIsAuthenticated(true);
        saveSession(validUser);
        return { success: true };
    };

    // Logout
    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        clearSession();
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
