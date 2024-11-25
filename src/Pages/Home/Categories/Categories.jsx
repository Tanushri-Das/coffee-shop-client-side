import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { useGetCategoriesQuery } from "../../../redux/features/categories/categoriesApi";

const Categories = () => {
  const { data: categories } = useGetCategoriesQuery();
  const [swiperSlidesPerView, setSwiperSlidesPerView] = useState(1);

  useEffect(() => {
    // Update the number of slides per view based on screen size
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        // Large screens
        setSwiperSlidesPerView(4);
      } else if (window.innerWidth >= 992) {
        // Large screens
        setSwiperSlidesPerView(3);
      } else if (window.innerWidth >= 600) {
        // Medium screens
        setSwiperSlidesPerView(2);
      } else {
        // Small screens
        setSwiperSlidesPerView(1);
      }
    };

    // Initial call
    handleResize();

    // Add event listener to handle screen size changes
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="mb-12 mx-3 md:mx-12 xl:mx-20">
      <h1 className="text-4xl font-bold mb-9 text-center">
        Our{" "}
        <span className="heading relative inline-block mt-4 sm:mt-0 px-8 py-2 text-white font-bold">
          Categories
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
        {categories?.map((category) => (
          <SwiperSlide key={category.id}>
            <div className="flex flex-col justify-center items-center border border-gray-200 rounded-xl h-full py-4">
              <img
                src={category.image}
                alt={category.title}
                className="h-36 mx-auto"
              />
              <h3 className="text-2xl font-semibold mt-2">
                {category.category_name}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Categories;
