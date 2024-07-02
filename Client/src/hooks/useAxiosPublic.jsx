import React from 'react';
import axios from 'axios';
const axiosPublic = axios.create({
    // baseURL:`https://my-project-server.onrender.com`
    baseURL:`https://my-project-server.onrender.com`
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;