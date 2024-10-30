import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";
import {
  FaGoogle,
  FaLinkedinIn,
  FaFacebook,
  FaInstagram,
  FaLocationDot,
  FaPhone,
} from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-[#F5F5F8] text-base-content px-8 lg:px-12 xl:px-20 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-8 text-center sm:text-left">
        <div className="flex flex-col items-center sm:items-start xl:mb-8">
          <Link to="/">
            <h1 className="text-xl lg:text-2xl font-bold italic text-[#6F4E37] tracking-wide transition-all duration-300 ease-in-out hover:scale-105">
              Sip Coffee
            </h1>
          </Link>
          <p className="w-full max-w-[300px] text-black text-[16px] font-normal my-4">
            Sip Coffee – crafted with passion, served with care.
          </p>
          <div className="flex space-x-3">
            <button className="flex justify-center items-center border border-gray-300 bg-[#F5F5F8] rounded-full w-12 h-12">
              <FaGoogle className="text-black text-2xl" />
            </button>
            <button className="flex justify-center items-center border border-gray-300 bg-[#F5F5F8] rounded-full w-12 h-12">
              <FaLinkedinIn className="text-black text-2xl" />
            </button>
            <button className="flex justify-center items-center border border-gray-300 bg-[#F5F5F8] rounded-full w-12 h-12">
              <FaFacebook className="text-black text-2xl" />
            </button>
            <button className="flex justify-center items-center border border-gray-300 bg-[#F5F5F8] rounded-full w-12 h-12">
              <FaInstagram className="text-black text-2xl" />
            </button>
          </div>
        </div>
        <div className="xl:mb-8">
          <h6 className="text-xl text-black font-semibold mb-5">Support</h6>
          <Link to="/menu" className="text-[16px] text-black font-normal block mb-2">
            Menu
          </Link>
          <Link to="/" className="text-[16px] text-black font-normal block mb-2">
            Help & Support
          </Link>
          <Link to="/" className="text-[16px] text-black font-normal block mb-2">
            Return Policy
          </Link>
          <Link to="/" className="text-[16px] text-black font-normal block">
            Terms of Use
          </Link>
        </div>
        <div className="mb-0 sm:mb-8 lg:mb-0 xl:mb-8">
          <h6 className="text-xl font-semibold text-black mb-5">View Guides</h6>
          <Link to="/" className="text-[16px] text-black font-normal block mb-2">
            Features
          </Link>
          <Link to="/" className="text-[16px] text-black font-normal block mb-2">
            Careers
          </Link>
          <Link to="/" className="text-[16px] text-black font-normal block mb-2">
            Blog Posts
          </Link>
          <Link to="/" className="text-[16px] text-black font-normal block">
            Our Branches
          </Link>
        </div>
        <div className="mb-8">
          <h6 className="text-xl font-semibold text-black mb-5">Contact</h6>
          <div className="flex justify-center sm:justify-start mb-2 items-center gap-x-2 text-black">
            <FaLocationDot className="text-lg" />
            <h1 className="text-[16px] font-normal block">
              250 New York City,USA 1001
            </h1>
          </div>
          <div className="flex justify-center sm:justify-start mb-2 items-center gap-x-2 text-black">
            <FaPhone className="text-lg" />
            <h1 className="text-[16px] font-normal block">+1 444 744 8444</h1>
          </div>
          <div className="flex justify-center sm:justify-start items-center gap-x-2 text-black">
            <MdOutlineMailOutline className="text-xl mt-1" />
            <h1 className="text-[16px] font-normal block">coffee@shop.com</h1>
          </div>
        </div>
      </div>
      <hr className="w-full border-t-2 border-gray-400 mb-4" />
      <div className="mt-8 text-center text-black font-medium text-[16px]">
        © {currentYear} coffee shop website. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
