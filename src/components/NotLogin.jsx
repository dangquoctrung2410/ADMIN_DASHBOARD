import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';


const NotLogin = () => {
    const useLogin = useSelector(state => state.auth.isLogin)
    return (
        <>
            {useLogin ? <Navigate to={'/'}></Navigate> : <Outlet></Outlet>}
        </>
    );
};

export default NotLogin;