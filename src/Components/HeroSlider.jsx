import React from 'react';
import 'swiper/css'; 
import 'swiper/css/pagination';
import H1 from "../assets/img 1.png";
import H2 from "../assets/img 2.png";
import H3 from "../assets/img 3.png";
import H4 from "../assets/img 4.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

const HeroSlider = () => {
    return (
        <div className='pb-10'>
            <Swiper
                spaceBetween={20}
                slidesPerView={3}
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 1500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop={true}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                style={{ paddingBottom: '40px' }} 
            >
                <SwiperSlide><img src={H1} alt="" className='w-full h-[250px] object-cover rounded-lg' /></SwiperSlide>
                <SwiperSlide><img src={H3} alt="" className='w-full h-[250px] object-cover rounded-lg' /></SwiperSlide>
                <SwiperSlide><img src={H2} alt="" className='w-full h-[250px] object-cover rounded-lg' /></SwiperSlide>
                <SwiperSlide><img src={H4} alt="" className='w-full h-[250px] object-cover rounded-lg' /></SwiperSlide>
            </Swiper>
        </div>
    );
};

export default HeroSlider;