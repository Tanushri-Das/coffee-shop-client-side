import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./Firebase/Firebase.config"; // Firebase setup
import { loginUser, setLoading } from "./redux/features/auth/authSlice";
import { RouterProvider } from "react-router-dom";
import routes from "./Routes/Routes/Routes";
import { useGetUserByEmailQuery } from "./redux/features/auth/authApi"; 

const App = () => {
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState(null);

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUserEmail(authUser.email);
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  // Fetch user information using RTK Query
  const { data: userInfo } = useGetUserByEmailQuery(userEmail, {
    skip: !userEmail,
  });

  // Update the Redux store with the user's information
  useEffect(() => {
    if (userInfo) {
      dispatch(
        loginUser({
          uid: auth.currentUser.uid,
          email: auth.currentUser.email,
          name: userInfo.name,
        })
      );
    }
  }, [dispatch, userInfo]);

  return <RouterProvider router={routes} />;
};

export default App;
