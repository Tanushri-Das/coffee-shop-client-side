import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { useGetFeaturesQuery } from "../../../redux/features/features/featuresApi";

const Features = () => {
  const { data: features } = useGetFeaturesQuery();
  const [swiperSlidesPerView, setSwiperSlidesPerView] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setSwiperSlidesPerView(3);
      } else if (window.innerWidth >= 600) {
        setSwiperSlidesPerView(2);
      } else {
        setSwiperSlidesPerView(1);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="mb-12 mx-3 md:mx-12 xl:mx-20">
      <h1 className="text-4xl font-bold text-center mb-9">
        Our{" "}
        <span className="heading relative inline-block px-8 py-2 mt-4 sm:mt-0 text-white font-bold">
          Features
        </span>
      </h1>
      <Swiper
        slidesPerView={swiperSlidesPerView}
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        {features?.map((category) => (
          <SwiperSlide key={category.id}>
            <div className="flex flex-col justify-center items-center border border-gray-200 rounded-xl h-full py-4 bg-white">
              <img
                src={category.image}
                alt={category.title}
                className="h-24 mx-auto mb-3"
              />
              <h3 className="text-2xl font-semibold text-black">
                {category.title}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Features;
