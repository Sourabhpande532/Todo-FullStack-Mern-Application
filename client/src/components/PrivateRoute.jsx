import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';

const PrivateRoute = () => {
const {auth} = useAuth();
// console.log({auth})
/*to make this true it will go in hooks */

if(auth === undefined) return "Loading....";
return auth === true ? <Outlet/> : <Navigate to="/auth"/>
}

export default PrivateRoute