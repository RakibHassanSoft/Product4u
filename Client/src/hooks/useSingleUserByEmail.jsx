import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';

const useSingleUserByEmail = () => {
    const axiosPublic = useAxiosPublic();
    const {user} = useAuth();
    const { isLoading, refetch, data: db_user = {} } = useQuery({
        queryKey: ['db_user'],
        queryFn: async () => {

            const res = await axiosPublic.get(`/singleUser?email=${user.email}`);
            return res.data;

            console.log(db_user)

        }
    });
    return [ isLoading, refetch, db_user]

};

export default useSingleUserByEmail;