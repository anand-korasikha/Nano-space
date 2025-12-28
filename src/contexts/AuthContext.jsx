import React, { createContext, useContext, useState, useEffect } from 'react';

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
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Error parsing stored user:', error);
                localStorage.removeItem('nanospace_user');
            }
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        // In production, this would validate credentials with backend
        const userWithRole = {
            id: Date.now().toString(),
            email: userData.email,
            name: userData.name || userData.email.split('@')[0],
            role: userData.role || 'customer', // customer, owner, admin
            phone: userData.phone || '',
            createdAt: new Date().toISOString()
        };

        setUser(userWithRole);
        localStorage.setItem('nanospace_user', JSON.stringify(userWithRole));
        return userWithRole;
    };

    const signup = (userData) => {
        // In production, this would create user in backend
        return login(userData);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('nanospace_user');
    };

    const updateProfile = (updates) => {
        if (!user) return;

        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('nanospace_user', JSON.stringify(updatedUser));
    };

    const hasRole = (role) => {
        return user?.role === role;
    };

    const isAuthenticated = () => {
        return !!user;
    };

    const value = {
        user,
        loading,
        login,
        signup,
        logout,
        updateProfile,
        hasRole,
        isAuthenticated
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
