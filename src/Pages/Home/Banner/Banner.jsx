import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./Banner.css";
import Button from "../../../Components/Button/Button";

const Banner = () => {
  const bannerdata = [
    {
      id: 1,
      image:
        "https://img.freepik.com/free-vector/top-view-cup-coffee-with-roasted-beans_52683-32340.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1704931200&semt=ais",
      title: "Premium Coffee Blends",
      desc: "Indulge in our premium coffee blends crafted from the finest beans around the world. Elevate your coffee experience with every sip.",
    },
    {
      id: 2,
      image:
        "https://image.slidesdocs.com/responsive-images/background/coffee-beans-white-coffee-cup-coffee-table-powerpoint-background_f4ab4a034a__960_540.jpg",
      title: "Cozy Coffee Atmosphere",
      desc: "Immerse yourself in our cozy coffee shop atmosphere. Relax, unwind, and savor the moment with every cup of our handcrafted coffee.",
    },
    {
      id: 3,
      image:
        "https://img.freepik.com/premium-photo/using-smartphone-with-burger-french-fries-coffee-set-wooden-background-copyspace-your-text_171194-226.jpg?w=2000",
      title: "Irresistible Fast Food Delights",
      desc: "Indulge in our irresistible fast food delights, meticulously crafted to satisfy your cravings. Each bite is a journey into the world of flavor and culinary excellence.",
    },
    {
      id: 4,
      image:
        "https://image.slidesdocs.com/responsive-images/background/coffee-american-drink-white-powerpoint-background_d0807fbdca__960_540.jpg",
      title: "Artisanal Coffee Experience",
      desc: "Embark on an artisanal coffee journey with our carefully curated selection. Impeccable taste and quality in every crafted cup.",
    },
    {
      id: 5,
      image:
        "https://img.freepik.com/free-vector/restaurant-mural-wallpaper_23-2148704223.jpg",
      title: "Cozy Corner Retreat",
      desc: "Escape to our cozy coffee corner, where the aroma of freshly brewed coffee welcomes you. Unwind in a tranquil atmosphere and experience a moment of pure bliss.",
    },
  ];

  return (
    <div className="mb-12">
      <Carousel autoPlay infiniteLoop>
        {bannerdata.map((item) => (
          <div key={item.id} className="relative">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[500px] md:h-[550px] object-cover"
            />
            {/* Full black overlay for text visibility */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-6">
              <h1 className="text-2xl md:text-4xl font-bold text-center mb-4">
                {item.title}
              </h1>
              <p className="text-base md:text-lg text-center max-w-lg mb-5">
                {item.desc}
              </p>
              <Button name={"Order Now"} />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
