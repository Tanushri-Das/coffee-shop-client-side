import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import CustomSpinner from "../../Components/CustomSpinner/CustomSpinner";

const PrivateRoutes = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.isLoading); // Accessing loading state
  console.log("PrivateRoutes",loading)
  const location = useLocation();

  if (loading) {
    return <CustomSpinner />; // Display spinner while loading
  }

  if (user) {
    return children; // Render children if user is logged in
  }

  return (
    <Navigate to="/login" state={{ from: location }} replace>
      PrivateRoutes
    </Navigate>
  );
};

export default PrivateRoutes;
