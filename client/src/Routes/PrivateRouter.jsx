import React from 'react';
import { Navigate } from 'react-router-dom';
import { useData } from '../hooks';

const PrivateRouter = ({ children }) => {
    const { isAuth } = useData();
    if (isAuth) return children;
    return <Navigate to='/login' />
}

export default PrivateRouter
