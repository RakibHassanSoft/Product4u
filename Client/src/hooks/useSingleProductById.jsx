import { useQuery } from '@tanstack/react-query';
import React from 'react';

export const useSingleProductById = (id) => {
    const { isLoading, refetch, data: product = {} } = useQuery({
        queryKey: ['userProduct'], // Include id in the queryKey to make it unique per product
        queryFn: async () => {
            if (id) {
                const res = await axiosPublic.get(`/user/products/${id}`);
                return res.data;
                // console.log(res.data)
            }
            return {};
        }
    });
    console.log(product)

    return [isLoading,refetch,product];
};

