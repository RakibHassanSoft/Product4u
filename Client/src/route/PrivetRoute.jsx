import React, { useContext } from 'react';

import { Navigate, useLoaderData, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import useSingleUserByEmail from '../hooks/useSingleUserByEmail';


const PrivetRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    const  [ isLoading, refetch, db_user] = useSingleUserByEmail()
    const location = useLocation()
    //  console.log(user)
    if(loading){
        return <div className='flex justify-center items-center'>
            <span className="loading loading-spinner loading-lg"></span>
        </div> 
    }
    if(user){
        return children;
    }
    return <Navigate to='/login' state={{from: location}}></Navigate>
};

export default PrivetRoute;