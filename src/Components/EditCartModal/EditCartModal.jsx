import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useUpdateCartMutation } from "../../redux/features/cart/cartApi";
import Swal from "sweetalert2";
import Button from "../Button/Button";

const EditCartModal = ({ closeModal, booking, refetch }) => {
  const [formData, setFormData] = useState({
    address: "",
    phone: "",
    countryCode: "",
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [updateCart] = useUpdateCartMutation();

  useEffect(() => {
    if (booking) {
      setFormData({
        address: booking.address || "",
        phone: booking.phone || "",
        countryCode: booking.countryCode || "",
      });
      setPhoneNumber(`${booking.countryCode}${booking.phone}`);
    }
  }, [booking]);

  const handleChange = (value) => {
    setPhoneNumber(value);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Extract the country code and local phone number
    const countryCode = phoneNumber.slice(0, phoneNumber.length - 10);
    const phone = phoneNumber.slice(-10);

    // Prepare the updated booking object
    const updatedBooking = {
      id: booking._id, // Include the booking ID
      quantity: booking.quantity, // Include any other necessary fields as required
      address: formData.address,
      phone,
      countryCode,
    };

    try {
      // Call the updateCart mutation and wait for the response
      const response = await updateCart(updatedBooking).unwrap(); // Unwrap to get the response directly
      console.log("Update successful:", response);
      closeModal();
      refetch();
      Swal.fire({
        title: "Success!",
        text: "Update booking information successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Failed to update the cart:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
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
          <h3 className="font-semibold text-black text-xl mb-5">
            {booking.item_name}
          </h3>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="border text-black border-gray-300 rounded-lg w-full mb-2 text-[16px] p-3 font-medium outline-none"
            />
            <div>
              <PhoneInput
                country={"bd"}
                value={phoneNumber}
                onChange={handleChange}
                inputProps={{
                  className:
                    "border text-black border-gray-300 rounded-lg w-full ps-12 py-3 outline-none"
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

export default EditCartModal;
