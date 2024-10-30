import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { useGetFeaturesQuery } from "../../../redux/features/features/featuresApi";
import CustomSpinner from "../../../Components/CustomSpinner/CustomSpinner";

const Features = () => {
  const { data: features, error, isLoading } = useGetFeaturesQuery();
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

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="mb-12 mx-3 md:mx-12 xl:mx-20">
      <h1 className="text-4xl font-bold text-center mb-5">
        Our{" "}
        <span className="heading relative inline-block px-8 py-2 mt-4 sm:mt-0 text-white font-bold">
          Features
        </span>
      </h1>
      <>
        {isLoading ? (
          <CustomSpinner />
        ) : (
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
            {features.map((category) => (
              <SwiperSlide key={category.id}>
                <div className="flex flex-col justify-center items-center border border-gray-200 rounded-xl h-full py-4 bg-white">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="h-36 mx-auto mb-4"
                  />
                  <h3 className="text-2xl font-semibold text-black">
                    {category.title}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </>
    </div>
  );
};

export default Features;
