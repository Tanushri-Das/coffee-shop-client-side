import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./Firebase/Firebase.config"; // Firebase setup
import { loginUser, setLoading } from "./redux/features/auth/authSlice";
import { Outlet } from "react-router-dom";
import { useGetUserByEmailQuery } from "./redux/features/auth/authApi"; // Assuming this exists to get user by email

const App = () => {
  const dispatch = useDispatch();

  // Create a state variable to hold the user's email
  const [userEmail, setUserEmail] = React.useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // Set the user email for fetching user info
        setUserEmail(authUser.email);
        dispatch(setLoading(false)); // Set loading to false after checking auth
      } else {
        dispatch(setLoading(false)); // Set loading to false if no user is authenticated
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [dispatch]);

  // Call the query hook outside of the effect
  const { data: userInfo } = useGetUserByEmailQuery(userEmail, {
    skip: !userEmail, // Skip fetching if userEmail is not set
  });

  useEffect(() => {
    if (userInfo) {
      // Dispatch user information to the Redux store
      dispatch(
        loginUser({
          uid: auth.currentUser.uid,
          email: auth.currentUser.email,
          name: userInfo.name, // Store the name retrieved from the database
        })
      );
    }
  }, [dispatch, userInfo]);

  return <Outlet />;
};

export default App;
