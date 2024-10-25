import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/Firebase.config";
import { loginUser } from "../../redux/features/auth/authSlice";
import { useGetUserByEmailQuery } from "../../redux/features/auth/authApi";
import Button from "../../Components/Button/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm(); 
  const email = watch("email"); // Get the value of the email input

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Use the query to get user info based on the email
  const { data: userInfo, refetch } = useGetUserByEmailQuery(email, {
    skip: !email, // Skip fetching if email is not provided
  });

  const onSubmit = async ({ email, password }) => {
    // Using destructured form data
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Refetch user info after successful login
      await refetch();

      dispatch(
        loginUser({
          email: user.email,
          name: userInfo?.name, // Store the name retrieved from the database
        })
      );

      // Show success alert
      Swal.fire({
        title: "Good job!",
        text: "You Login Successfully!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      // Navigate to the previous page or home
      navigate(from, { replace: true });
    } catch (error) {
      // Show error alert
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
  };

  return (
    <div className="lg:mx-10 xl:mx-20 my-12 mx-2 sm:mx-0">
      <div className="w-full flex-shrink-0 sm:max-w-lg mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)} // Updated onSubmit
          className="space-y-4 max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md"
        >
          <h1 className="text-black text-center text-4xl mb-6 font-bold">
            Login
          </h1>
          <div>
            <label className="block text-black text-lg font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email Address is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              className="border text-black border-gray-300 rounded-lg w-full p-3 outline-none"
            />
            {errors.email && (
              <span className="text-red-600 mt-1">{errors.email.message}</span>
            )}
          </div>
          <div>
            <label className="block text-black text-lg font-semibold mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="border text-black border-gray-300 rounded-lg w-full p-3 outline-none"
              />
              <span
                className="absolute text-black right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <span className="text-red-600 mt-1">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="flex justify-center mt-4">
            <Button name={"Login"} />
          </div>
          <p className="text-center text-[16px] text-black font-medium mt-2">
            Don’t have an account?
            <Link to="/signup" className="text-[#ff7800] ms-1">
              Signup
            </Link>
          </p>
          <p className="text-center text-lg font-bold my-4 text-black">Or</p>
          <SocialLogin />
        </form>
      </div>
    </div>
  );
};

export default Login;
