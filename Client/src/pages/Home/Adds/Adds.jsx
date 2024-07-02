import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const Adds = () => {
  const axiosPublic = useAxiosPublic();
  const { isLoading, refetch, data: cupons = [] } = useQuery({
    queryKey: ['cupon'],
    queryFn: async () => {
      const res = await axiosPublic.get(`/coupons`);
      return res.data;
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-11/12 m-auto my-10 p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg relative">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold mb-4">🔥 Latest Coupon 🔥</h1>
        <p className="text-2xl">
          Use coupon code{' '}
          <strong className="block text-6xl font-black text-yellow-300 my-4">
            {cupons[0]?.cupon}
          </strong>
          to get a discount of{' '}
          <span className="text-3xl text-yellow-300">${cupons[0]?.discout}</span>
        </p>
      </div>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 600"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <g strokeWidth="80">
            <circle cx="0" cy="400" r="600" fill="rgba(255,255,255,0.1)" />
            <circle cx="800" cy="200" r="400" fill="rgba(255,255,255,0.1)" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Adds;
