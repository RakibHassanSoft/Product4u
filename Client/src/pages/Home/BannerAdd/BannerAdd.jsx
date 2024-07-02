import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const BannerAd = () => {
  const axiosPublic = useAxiosPublic();
  const { isLoading, refetch, data: cupons = [] } = useQuery({
    queryKey: ['cupon'],
    queryFn: async () => {
      const res = await axiosPublic.get(`/coupons`);
      return res.data;
    }
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenAd = sessionStorage.getItem('hasSeenAd');
    if (!hasSeenAd) {
      setIsVisible(true);
      sessionStorage.setItem('hasSeenAd', 'true');
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleClearAdFlag = () => {
    sessionStorage.removeItem('hasSeenAd');
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-6 z-50 w-4/5 max-w-lg">
      <button
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
        onClick={handleClose}
      >
        ✖
      </button>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Latest Coupon</h1>
        <p className="mt-4 text-lg text-gray-700">
          Use coupon code <strong className="text-4xl text-red-500">{cupons[0]?.cupon}</strong> to get a discount of ${cupons[0]?.discout}
        </p>
      </div>
      <button
        className="absolute p-8 bottom-4 left-4 text-sm text-blue-500 hover:underline"
        onClick={handleClearAdFlag}
      >
        Clear Ad Flag
      </button>
    </div>
  );
};

export default BannerAd;
