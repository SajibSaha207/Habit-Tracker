import React from 'react';

import H1 from "../assets/img 1.png";
import H2 from "../assets/img 2.png";
import H3 from "../assets/img 3.png";
import H4 from "../assets/img 4.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

const HeroSlider = () => {
    return (
        <div>
            <Swiper
            spaceBetween={50}
            slidesPerView={3}
            modules={[Autoplay]}
            autoplay={{delay:1500, disableOnInteraction:false}}
            loop={true}
            >
                <SwiperSlide><img src={H1} alt="" className='w-full h-[250px] object-cover' /></SwiperSlide>
                <SwiperSlide><img src={H2} alt="" className='w-full h-[250px] object-cover' /></SwiperSlide>
                <SwiperSlide><img src={H3} alt="" className='w-full h-[250px] object-cover' /></SwiperSlide>
                <SwiperSlide><img src={H4} alt="" className='w-full h-[250px] object-cover' /></SwiperSlide>



            </Swiper>
        </div>
    );
};

export default HeroSlider;