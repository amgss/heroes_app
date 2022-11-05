import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../auth/context/AuthContext';

export const PublicRoute = ({ children }) => {
    const { logged } = useContext(AuthContext);
    console.log('Public Route');

    return (!logged)
        ? children
        : <Navigate to="/" />;
}
