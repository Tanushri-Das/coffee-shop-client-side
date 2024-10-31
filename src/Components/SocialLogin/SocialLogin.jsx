import React from "react";
import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { auth, provider } from "../../Firebase/Firebase.config"; // Ensure you have Firebase configured
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/features/auth/authSlice"; // Import loginUser action
import { signInWithPopup } from "firebase/auth"; // Import signInWithPopup
import { useSaveUserMutation } from "../../redux/features/auth/authApi";

const SocialLogin = () => {
  const dispatch = useDispatch(); // Initialize Redux dispatch
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [saveUser] = useSaveUserMutation();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedInUser = result.user;

      const userData = {
        email: loggedInUser.email,
        name: loggedInUser.displayName, // Get display name from Google
      };

      // Dispatch login action to update state
      dispatch(loginUser(userData));

      const savedUser = await saveUser({
        email: loggedInUser.email,
        name: loggedInUser.displayName,
      }).unwrap();
      console.log("Saved User:", savedUser);
      localStorage.setItem("user", JSON.stringify(savedUser));
      Swal.fire({
        title: "Success!",
        text: "Logged in successfully!",
        icon: "success",
        timer: 1500,
      });

      // Redirect to the original route or home page
      navigate(from);
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      Swal.fire({
        title: "Error",
        text: "Failed to log in. Please try again later.",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex justify-center items-center google-btn-div">
      <button
        onClick={handleGoogleSignIn}
        className="flex items-center py-4 border border-gray-500 rounded-full"
        style={{ padding: "8px" }}
      >
        <div className="flex items-center justify-center text-black rounded-full p-2">
          <FaGoogle />
        </div>
      </button>
    </div>
  );
};

export default SocialLogin;
