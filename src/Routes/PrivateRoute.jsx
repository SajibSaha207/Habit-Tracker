import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Components/Loading';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if (loading){
        return <div><Loading></Loading></div>
    }

    if(!user){
        return<Navigate to ="/auth/login" state={{from:location}} replace />;
    }
    return children;
      
};

export default PrivateRoute;