import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
;
import Swal from 'sweetalert2';


const exiosSecure = axios.create({
    // baseURL: 'https://my-project-server.onrender.com'
    baseURL: 'https://my-project-server.onrender.com'
})
const useAxiosSecure = () => {
    const naviagete = useNavigate()

    //request intercepter to add authorization header for every secure call to the api
    
    exiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`
        // console.log('Request stoped by interceptors', token)
        return config;
    }, function (err) {
        return Promise.reject(err)
    })


    //intercepts 401 and 403
    exiosSecure.interceptors.response.use(function (response) {
        return response
    }, async (err) => {
        const status = err.response.status;
        if (status === 401 || status === 403) {
            //for logout the use and sent to login 
            await Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
            await signOutUser()
            localStorage.removeItem('access-token')
            naviagete("/login")
        }
        console.log('status err in the interceptor', err)
        return Promise.reject(err)
    })
    return exiosSecure
};

export default useAxiosSecure;