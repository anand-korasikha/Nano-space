import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole = null }) => {
    const { user, isAuthenticated } = useAuth();
    const location = useLocation();

    // Not authenticated - redirect to login
    if (!isAuthenticated()) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Authenticated but wrong role - redirect to appropriate dashboard
    if (requiredRole && user.role !== requiredRole) {
        const dashboardPath = `/dashboard/${user.role}`;
        return <Navigate to={dashboardPath} replace />;
    }

    // Authenticated and correct role (or no role required)
    return children;
};

export default ProtectedRoute;
