import React, { useState } from 'react';
import useAxiosPublic from "../../../hooks/useAxiosPublic"
import { useQuery } from '@tanstack/react-query';
import TrandingCard from '../../../components/TrandingCard/TrandingCard';

const Trending = ({title}) => {
    const axiosPublic = useAxiosPublic();
    const { isLoading, refetch, data: trendings = [] } = useQuery({
        queryKey: ['trending'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products/trending`);
            return res.data;
        }
    });

    const [showAll, setShowAll] = useState(false);
    const displayLimit = 6;

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    return (
        <div  className='bg-blue-50 w-full'>
            {isLoading && <span className="loading loading-spinner text-error"></span>}

            <h1 className='text-4xl text-center mt-10 mb-5 text-blue-400 font-serif'>{title}</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1'>
                {trendings.slice(0, showAll ? trendings.length : displayLimit).map((item, index) =>
                    <TrandingCard key={index} item={item} />
                )}
            </div>

            {!showAll && (
                <div className="flex justify-center mt-4">
                    <button onClick={toggleShowAll} className="btn bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        See More
                    </button>
                </div>
            )}
        </div>
    );
};

export default Trending;
