import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useAddReviewMutation } from "../../../redux/features/reviews/reviewsApi";
import Button from "../../../Components/Button/Button";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const AddReview = () => {
  const user = useSelector((state) => state.auth.user);
  const [addReview] = useAddReviewMutation();
  const { register, handleSubmit, reset } = useForm();

  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        console.log(imgResponse);
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          const { name, email, rating, review } = data;
          try {
            const newReview = {
              name,
              email,
              rating,
              review,
              image: imgURL,
            };
            addReview(newReview).unwrap();
            reset();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Review added successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          } catch (error) {
            console.error("Error storing review data:", error);
            Swal.fire({
              title: "Error!",
              text: "Something went wrong. Please try again.",
              icon: "error",
              confirmButtonText: "Retry",
            });
          }
        }
      });
  };

  return (
    <>
      <Helmet>
        <title>Sip Coffee | Add Review</title>
      </Helmet>
      <div className="my-12">
        <h3 className="text-center text-4xl font-bold mb-6">Give Review</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-xl"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full">
              <label className="block text-gray-700 text-lg font-semibold mb-1">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                value={user.name}
                className="border border-gray-300 text-black rounded-lg w-full p-3 outline-none"
              />
            </div>
            <div className="w-full">
              <label className="block text-gray-700 text-lg font-semibold mb-1">
                Email
              </label>
              <input
                type="text"
                {...register("email", { required: true })}
                value={user.email}
                className="border border-gray-300 text-black rounded-lg w-full p-3 outline-none"
              />
            </div>
          </div>
          <div className="w-full">
            <label className="block text-gray-700 text-lg font-semibold mb-1">
              Rating
            </label>
            <select
              className="border border-gray-300 hover:cursor-pointer text-black rounded-lg w-full p-3 outline-none"
              {...register("rating", { required: true })}
            >
              <option>1</option>
              <option>2</option>
              <option>2.5</option>
              <option>3</option>
              <option>3.5</option>
              <option>4</option>
              <option>4.5</option>
              <option>5</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-lg font-semibold mb-1">
              Image *
            </label>
            <input
              type="file"
              className="border border-gray-300 text-black rounded-lg w-full p-3 outline-none"
              {...register("image", { required: true })}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-lg font-semibold mb-1">
              Description
            </label>
            <textarea
              className="border border-gray-300 rounded-lg w-full text-black h-24 p-3 outline-none"
              placeholder="Review in detail"
              {...register("review", { required: true })}
            ></textarea>
          </div>

          <div className="flex justify-center mt-4">
            <Button name={"Submit"} />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddReview;
