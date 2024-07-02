import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { Pagination, Navigation } from 'swiper/modules';
import Review from './Review';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const Reviews = ({ _id }) => {
    const productId = _id;
    // console.log(productId)
    const axiosPublic = useAxiosPublic();
    const { isLoading, refetch, data: reviews = {} } = useQuery({
        queryKey: ['reviews'], // Include id in the queryKey to make it unique per product
        queryFn: async () => {
            if (productId) {
                const res = await axiosPublic.get(`/reviews/${_id}`);
                return res.data;
            }
            return {};
        }
    });
    refetch();
    // console.log(reviews)
    const [swiperRef, setSwiperRef] = useState(null);

    let appendNumber = 4;
    let prependNumber = 1;

    const prepend2 = () => {
        swiperRef.prependSlide([
            '<div class="swiper-slide">Slide ' + --prependNumber + '</div>',
            '<div class="swiper-slide">Slide ' + --prependNumber + '</div>',
        ]);
    };

    const prepend = () => {
        swiperRef.prependSlide(
            '<div class="swiper-slide">Slide ' + --prependNumber + '</div>'
        );
    };

    const append = () => {
        swiperRef.appendSlide(
            '<div class="swiper-slide">Slide ' + ++appendNumber + '</div>'
        );
    };

    const append2 = () => {
        swiperRef.appendSlide([
            '<div class="swiper-slide">Slide ' + ++appendNumber + '</div>',
            '<div class="swiper-slide">Slide ' + ++appendNumber + '</div>',
        ]);
    };
    return (
        <div className='w-11/12 m-auto mt-5'>


            <Swiper
                onSwiper={setSwiperRef}
                slidesPerView={3}
                centeredSlides={true}
                spaceBetween={30}
                pagination={{
                    type: 'fraction',
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >

                <div >
                    {
                        reviews.length > 0 && reviews.map(review =>
                            <SwiperSlide key={review._id}>

                                <Review review={review}></Review>
                            </SwiperSlide>

                        )
                    }
                </div>

            </Swiper>

            <p className="append-buttons">
                <button onClick={() => prepend2()} className="prepend-2-slides">
                    Prepend 2 Slides
                </button>
                <button onClick={() => prepend()} className="prepend-slide">
                    Prepend Slide
                </button>
                <button onClick={() => append()} className="append-slide">
                    Append Slide
                </button>
                <button onClick={() => append2()} className="append-2-slides">
                    Append 2 Slides
                </button>
            </p>

        </div>
    );
};

export default Reviews;