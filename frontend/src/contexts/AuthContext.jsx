import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, storeTokens, clearTokens } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('nanospace_user');
        const token = localStorage.getItem('nanospace_token');
        if (storedUser && token) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Error parsing stored user:', error);
                localStorage.removeItem('nanospace_user');
                clearTokens();
            }
        }
        setLoading(false);
    }, []);

    /**
     * Login via Flask backend JWT auth.
     * Falls back to hardcoded admin for offline/dev use.
     */
    const login = async (userData) => {
        // ── Hardcoded admin credentials ───────────────────────────────────────
        if (
            userData.email === 'admin@nanospace.com' &&
            userData.password === 'Admin@123'
        ) {
            // Always try the real backend first to get a proper JWT token.
            // This prevents the auto-logout glitch caused by tokenless API calls.
            try {
                const data = await authAPI.login(userData.email, userData.password);
                const adminUser = {
                    ...data.user,
                    name: data.user.full_name,
                };
                storeTokens(data.access_token, data.refresh_token);
                setUser(adminUser);
                localStorage.setItem('nanospace_user', JSON.stringify(adminUser));
                return adminUser;
            } catch (_backendErr) {
                // Backend unavailable or admin not in DB — fall back to offline mode.
                // No JWT token is stored; API calls will gracefully fail without logging out.
                console.warn('Admin backend auth failed, using offline fallback.');
                const adminUser = {
                    id: 'admin-001',
                    email: 'admin@nanospace.com',
                    full_name: 'Admin',
                    name: 'Admin',
                    role: 'admin',
                    phone: '+91-9876543210',
                };
                setUser(adminUser);
                localStorage.setItem('nanospace_user', JSON.stringify(adminUser));
                return adminUser;
            }
        }

        // ── Real backend login ─────────────────────────────────────────────────
        try {
            const data = await authAPI.login(userData.email, userData.password);
            const loggedInUser = {
                ...data.user,
                name: data.user.full_name,
            };
            storeTokens(data.access_token, data.refresh_token);
            setUser(loggedInUser);
            localStorage.setItem('nanospace_user', JSON.stringify(loggedInUser));
            return loggedInUser;
        } catch (error) {
            throw new Error(error.message || 'Invalid email or password');
        }
    };

    /**
     * Register via Flask backend.
     */
    const signup = async (userData) => {
        if (userData.email === 'admin@nanospace.com') {
            throw new Error('This email is reserved. Please use a different email.');
        }

        try {
            const data = await authAPI.register({
                email: userData.email,
                password: userData.password,
                full_name: userData.name || userData.email.split('@')[0],
                role: userData.role || 'customer',
                phone: userData.phone || null,
            });

            const newUser = {
                ...data.user,
                name: data.user.full_name,
            };
            storeTokens(data.access_token, data.refresh_token);
            setUser(newUser);
            localStorage.setItem('nanospace_user', JSON.stringify(newUser));
            return newUser;
        } catch (error) {
            throw new Error(error.message || 'Registration failed');
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('nanospace_user');
        clearTokens();
    };

    const updateProfile = async (updates) => {
        if (!user) return;
        try {
            const data = await authAPI.updateProfile(updates);
            const updatedUser = { ...user, ...data.user, name: data.user.full_name };
            setUser(updatedUser);
            localStorage.setItem('nanospace_user', JSON.stringify(updatedUser));
            return updatedUser;
        } catch (error) {
            // Fallback: update locally for offline/admin
            const updatedUser = { ...user, ...updates };
            setUser(updatedUser);
            localStorage.setItem('nanospace_user', JSON.stringify(updatedUser));
            return updatedUser;
        }
    };

    const hasRole = (role) => user?.role === role;
    const isAuthenticated = () => !!user;

    const value = {
        user,
        loading,
        login,
        signup,
        logout,
        updateProfile,
        hasRole,
        isAuthenticated,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
