import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const Features = () => {
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

  const featuresData = [
    {
      id: 1,
      image:
        "https://w7.pngwing.com/pngs/11/946/png-transparent-quality-control-computer-icons-quality-assurance-quality-miscellaneous-service-logo-thumbnail.png",
      title: "Best Quality",
    },
    {
      id: 2,
      image:
        "https://cdn.iconscout.com/icon/premium/png-256-thumb/24-7-services-3230455-2690928.png",
      title: "24/7 Support",
    },
    {
      id: 3,
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/013/695/803/small_2x/customer-satisfaction-icon-style-free-vector.jpg",
      title: "Customer Satisfaction",
    },
    {
      id: 4,
      image:
        "https://cdn0.iconfinder.com/data/icons/business-and-finance-4-11/100/line-98-512.png",
      title: "Expert Team",
    },
    {
      id: 5,
      image: "https://www.globaleco12.com/assets/img/on-time-delivery-icon.png",
      title: "Timely Delivery",
    },
  ];
  return (
    <div className="m-12">
      <h1 className="text-4xl font-bold text-black text-center mb-10">
        Our{" "}
        <span className="heading relative inline-block px-8 py-2 text-white font-bold">
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
        className="mySwiper mt-10"
      >
        {featuresData.map((category) => (
          <SwiperSlide key={category.id}>
            <div className="flex flex-col justify-center items-center border border-gray-200 rounded-xl h-full py-4">
              <img
                src={category.image}
                alt={category.title}
                className="h-40 mx-auto mb-4"
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
