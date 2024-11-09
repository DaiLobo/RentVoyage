// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface CarouselResponsiveProps {
  images: string[]
}

export const CarouselResponsive: React.FC<CarouselResponsiveProps> = ({ images }) => {
  return (
    <>
      <Swiper
        spaceBetween={10}
        slidesPerView="auto"
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="lg:w-[700px] w-auto lg:h-[400px] h-[200px]"
      >
        {
          images.map((image, index) => (
            <SwiperSlide key={index} className="w-full h-full">
              <img src={image} alt="" className="rounded-lg" />
            </SwiperSlide>
          )
          )
        }
      </Swiper>
    </>
  );
}