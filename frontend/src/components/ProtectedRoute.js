// ProtectedRoute.js

import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (!isAuthenticated) {
        // User not authenticated, redirect to login page
        return <Navigate to="/login" />;
    }

    return children;
};
