// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { useState } from "react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

interface CarouselThumbsGalleryProps {
  images: string[]
}

export const CarouselThumbsGallery: React.FC<CarouselThumbsGalleryProps> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<null | SwiperType>(null);

  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation={true}
        modules={[FreeMode, Navigation, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        className="swiper mySwiper2"
      >
        {
          images.map((image, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <img src={image} alt={`Image ${index}`} className="rounded-lg" />
            </SwiperSlide>))
        }
      </Swiper>

      <Swiper
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress
        modules={[FreeMode, Navigation, Thumbs]}
        onSwiper={setThumbsSwiper}
        className="swiper mySwiper"
      >
        {
          images.map((image, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <img src={image} alt={`Thumbnail ${index}`} className="rounded-lg" />
            </SwiperSlide>
          )
          )
        }
      </Swiper>
    </>
  );
}