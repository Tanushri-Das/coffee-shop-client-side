import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useAddToContactMutation } from "../../../redux/features/contact/contactApi";
import Button from "../../../Components/Button/Button";
import "./ContactUs.css";

const ContactUs = () => {
  const { register, handleSubmit, reset } = useForm();
  const [addToContact] = useAddToContactMutation();
  const [phoneNumber, setPhoneNumber] = useState("+880");

  const onSubmit = async (data) => {
    // Extract country code and phone number separately
    const countryCode = phoneNumber.slice(0, phoneNumber.length - 10);
    const phone = phoneNumber.slice(-10);

    try {
      const newContact = {
        name: data.name,
        email: data.email,
        phone,
        countryCode,
        message: data.message,
      };
      await addToContact(newContact).unwrap();
      reset();
      setPhoneNumber("+880");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Contact added successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error storing contact data:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
  };

  return (
    <div className="mb-12 mx-3 md:mx-12 xl:mx-20 py-12 contact">
      <div className="w-full flex-shrink-0 sm:max-w-xl mx-auto px-2 sm:p-0">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full">
              <input
                type="text"
                placeholder="Name"
                className="border text-black border-gray-300 rounded-lg w-full p-3 outline-none"
                {...register("name", { required: true, maxLength: 90 })}
              />
            </div>
            <div className="w-full">
              <input
                type="email"
                placeholder="Email Address"
                className="border text-black border-gray-300 rounded-lg w-full p-3 outline-none"
                {...register("email", { required: true, maxLength: 90 })}
              />
            </div>
          </div>
          <div>
            <PhoneInput
              country="bd"
              value={phoneNumber}
              onChange={setPhoneNumber}
              inputProps={{
                className:
                  "border text-black border-gray-300 rounded-lg w-full ps-12 py-3 outline-none",
              }}
            />
          </div>
          <div>
            <textarea
              resize="none"
              placeholder="Your message"
              className="border h-24 text-black border-gray-300 outline-none rounded-lg w-full p-3"
              {...register("message", { required: true })}
            ></textarea>
          </div>

          <div className="flex justify-center mt-2">
            <Button name={"Submit"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
