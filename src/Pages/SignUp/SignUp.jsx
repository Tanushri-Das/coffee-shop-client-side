import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../Firebase/Firebase.config";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/features/auth/authSlice";
import { useSaveUserMutation } from "../../redux/features/auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "../../Components/Button/Button";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [saveUser] = useSaveUserMutation(); // Initialize saveUser mutation

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (data) => {
    const { username, email, password } = data;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update Firebase user profile with username
      await updateProfile(user, { displayName: username });

      // Dispatch login action to update state
      dispatch(
        loginUser({
          email: user.email,
          name: username, // Include username in the login action
        })
      );

      // Save the user to the backend
      const savedUser = await saveUser({
        name: username,
        email: user.email,
      }).unwrap();
      console.log("Saved User:", savedUser); // Log saved user to the console
      Swal.fire({
        title: "Good job!",
        text: "User added successfully!",
        icon: "success",
        timer: 1500,
      });
      // Redirect to the home page
      navigate("/");
    } catch (error) {
      console.error("Error during sign-up:", error.message);
      Swal.fire({
        title: "Error",
        text: "User addition failed. Please try again later.",
        icon: "error",
      });
    }
  };

  // Watch password and confirmPassword for matching check
  const password = watch("password");

  return (
    <>
      <Helmet>
        <title>Sip Coffee | SignUp</title>
      </Helmet>
      <div className="lg:mx-10 xl:mx-20 my-12 mx-2 sm:mx-0">
        <div className="w-full flex-shrink-0 sm:max-w-lg mx-auto">
          <form
            onSubmit={handleSubmit(onSubmit)} // Use handleSubmit from react-hook-form
            className="space-y-4 max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md"
          >
            <h1 className="text-black text-center text-4xl mb-6 font-bold">
              Sign Up
            </h1>
            <div>
              <label className="block text-black text-lg font-semibold mb-1">
                Username
              </label>
              <input
                type="text"
                placeholder="Username"
                {...register("username", { required: "Username is required" })}
                className="border text-black border-gray-300 rounded-lg w-full px-3 py-2 outline-none"
              />
              {errors.username && (
                <span className="text-red-600 mt-1">
                  {errors.username.message}
                </span>
              )}
            </div>
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
                <span className="text-red-600 mt-1">
                  {errors.email.message}
                </span>
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
            <div>
              <label className="block text-black text-lg font-semibold mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className="border text-black border-gray-300 rounded-lg w-full p-3 outline-none"
                />
                <span
                  className="absolute text-black right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.confirmPassword && (
                <span className="text-red-600 mt-1">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <div className="flex justify-center mt-4">
              <Button name={"Sign Up"} />
            </div>
            <p className="text-center text-black text-[16px] font-medium mt-2">
              Already have an account?
              <Link to="/login" className="text-[#6F4E37] ms-1">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
