import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaStar, FaStarHalf } from "react-icons/fa";
import "./Testimonials.css";
import { useGetReviewsQuery } from "../../../redux/features/reviews/reviewsApi";
import CustomSpinner from "../../../Components/CustomSpinner/CustomSpinner";

const Testimonials = () => {
  const { data: reviews, error, isLoading } = useGetReviewsQuery();

  const [swiperSlidesPerView, setSwiperSlidesPerView] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setSwiperSlidesPerView(3);
      } else if (window.innerWidth >= 768) {
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
    <div className="mb-12 mx-3 md:mx-12 xl:mx-20 relative">
      <h1 className="text-4xl font-bold mb-5 text-center">
        Customer's{" "}
        <span className="heading relative inline-block px-8 py-2 mt-4 sm:mt-0 text-white font-bold">
          Review
        </span>
      </h1>
      <>
        {isLoading ? (
          <CustomSpinner />
        ) : (
          <>
            <Swiper
              slidesPerView={swiperSlidesPerView}
              spaceBetween={30}
              navigation={{
                prevEl: ".swiper-button-prev",
                nextEl: ".swiper-button-next",
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Navigation, Autoplay]}
              className="mySwiper h-80 relative"
            >
              {reviews.map((review, index) => (
                <SwiperSlide key={index} style={{ height: "100%" }}>
                  <div className="flex flex-col text-center items-center border border-gray-200 rounded-xl px-5 pt-5 h-full">
                    <div className="flex flex-col items-center">
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-20 h-20 rounded-full mb-4"
                      />
                      <h3 className="text-[16px] mb-6 font-medium">
                        {review.review}
                      </h3>
                      <h1 className="text-xl font-semibold mb-3">
                        {review.name}
                      </h1>
                      <div className="flex justify-center items-center">
                        {Array.from(
                          { length: Math.floor(review.rating) },
                          (_, index) => (
                            <FaStar
                              key={index}
                              className="text-[#6F4E37] text-lg me-1"
                            />
                          )
                        )}
                        {review.rating % 1 === 0.5 && (
                          <FaStarHalf className="text-[#6F4E37] text-lg" />
                        )}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-button-prev-container flex items-center justify-center">
              <div className="swiper-button-prev">
                <FiChevronLeft />
              </div>
            </div>
            <div className="swiper-button-next-container flex items-center justify-center">
              <div className="swiper-button-next">
                <FiChevronRight />
              </div>
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default Testimonials;
