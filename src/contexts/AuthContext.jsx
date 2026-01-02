import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Default admin credentials
const DEFAULT_ADMIN = {
    email: 'admin@nanospace.com',
    password: 'Admin@123',
    name: 'Admin',
    role: 'admin',
    phone: '+91-9876543210'
};

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
        // Check if logging in as default admin
        if (userData.email === DEFAULT_ADMIN.email) {
            if (userData.password !== DEFAULT_ADMIN.password) {
                throw new Error('Invalid email or password');
            }

            const adminUser = {
                id: 'admin-001',
                email: DEFAULT_ADMIN.email,
                name: DEFAULT_ADMIN.name,
                role: DEFAULT_ADMIN.role,
                phone: DEFAULT_ADMIN.phone,
                createdAt: new Date().toISOString()
            };

            setUser(adminUser);
            localStorage.setItem('nanospace_user', JSON.stringify(adminUser));
            return adminUser;
        }

        // For other users, check if they exist in localStorage
        const storedUsers = JSON.parse(localStorage.getItem('nanospace_users') || '[]');
        const existingUser = storedUsers.find(u => u.email === userData.email);

        if (existingUser) {
            if (existingUser.password !== userData.password) {
                throw new Error('Invalid email or password');
            }

            const { password, ...userWithoutPassword } = existingUser;
            setUser(userWithoutPassword);
            localStorage.setItem('nanospace_user', JSON.stringify(userWithoutPassword));
            return userWithoutPassword;
        }

        // If user doesn't exist, throw error
        throw new Error('User not found. Please sign up first.');
    };

    const signup = (userData) => {
        // Check if email already exists
        const storedUsers = JSON.parse(localStorage.getItem('nanospace_users') || '[]');

        if (userData.email === DEFAULT_ADMIN.email) {
            throw new Error('This email is reserved. Please use a different email.');
        }

        if (storedUsers.some(u => u.email === userData.email)) {
            throw new Error('Email already registered. Please login instead.');
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            email: userData.email,
            password: userData.password,
            name: userData.name || userData.email.split('@')[0],
            role: userData.role || 'customer',
            phone: userData.phone || '',
            createdAt: new Date().toISOString()
        };

        // Store user in users array
        storedUsers.push(newUser);
        localStorage.setItem('nanospace_users', JSON.stringify(storedUsers));

        // Login the user (without password in session)
        const { password, ...userWithoutPassword } = newUser;
        setUser(userWithoutPassword);
        localStorage.setItem('nanospace_user', JSON.stringify(userWithoutPassword));
        return userWithoutPassword;
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
