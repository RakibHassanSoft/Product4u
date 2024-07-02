
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';


const Hero = () => {
    return (
        <div className='pt-28'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img className='w-full h-[35rem]' src="https://smartslider3.com/wp-content/uploads/slider132/image-slider-with-thumbnail1.jpeg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='w-full h-[35rem]' src="https://th.bing.com/th/id/OIP.ASftE9pfbU0Wp-k2Ug16lAHaEZ?rs=1&pid=ImgDetMain" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='w-full h-[35rem]' src="https://www.wallpaperflare.com/static/587/221/275/lake-river-sky-clouds-wallpaper.jpg" alt="" />
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default Hero;