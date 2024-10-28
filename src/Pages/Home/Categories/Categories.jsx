import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const Categories = () => {
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

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
  }, []);

  return (
    <section className="m-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-black mb-5">
          Explore Our{" "}
          <span className="heading relative inline-block mt-4 sm:mt-0 px-8 py-2 text-white font-bold">
            Categories
          </span>
        </h1>
        <p className="text-[16px] w-full md:w-2/4 mx-auto text-center mb-10 px-16">
          Discover a variety of categories tailored to your preferences. Each
          category offers a unique experience, bringing you the best in quality
          and taste.
        </p>
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
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <div className="flex flex-col justify-center items-center border border-gray-200 rounded-xl h-full py-4">
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-40 mx-auto"
                />
                <h3 className="text-2xl font-semibold text-black mt-2">
                  {category.category_name}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Categories;
