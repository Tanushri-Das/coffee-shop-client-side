import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useSelector } from "react-redux";
import {
  useAddToCartMutation,
  useGetCartdataByEmailQuery,
} from "../../redux/features/cart/cartApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

const BookingModal = ({ closeModal, item }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: user?.name || "",
    email: user?.email || "",
    address: "",
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addToCart] = useAddToCartMutation();
  const { refetch } = useGetCartdataByEmailQuery(user?.email);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const countryCode = phoneNumber.slice(0, phoneNumber.length - 10);
    const phone = phoneNumber.slice(-10);

    const newBooking = {
      productId: item._id,
      item_name: item.item_name,
      price: item.price,
      image: item.image,
      quantity: 1,
      username: formData.username,
      email: formData.email,
      address: formData.address,
      phone,
      countryCode,
    };

    addToCart(newBooking)
      .unwrap()
      .then(() => {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Order successfully placed!",
          showConfirmButton: false,
          timer: 1500,
        });
        closeModal(); // Use closeModal to close the modal
        navigate("/dashboard/myCart");
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonText: "Retry",
        });
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <button
          className="absolute top-4 right-2 text-gray-500 hover:text-gray-700"
          onClick={closeModal}
        >
          <AiOutlineClose size={26} />
        </button>
        <div className="mt-5">
          <h3 className="font-semibold text-black text-xl mb-5">{item.item_name}</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Name"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="border text-black border-gray-300 rounded-lg w-full mb-2 text-[16px] p-3 font-medium outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="border text-black border-gray-300 rounded-lg w-full mb-2 text-[16px] p-3 font-medium outline-none"
            />
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border text-black border-gray-300 rounded-lg w-full mb-2 text-[16px] p-3 font-medium outline-none"
            />
            <div>
              <PhoneInput
                country={"bd"}
                value={phoneNumber}
                onChange={setPhoneNumber}
                inputProps={{
                  className:
                    "border text-black border-gray-300 rounded-lg w-full ps-12 py-3 outline-none",
                }}
              />
            </div>
            <div className="flex justify-center gap-x-4 mt-4">
              <Button name={"Submit"} />
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 text-lg px-6 py-2 rounded-md font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
