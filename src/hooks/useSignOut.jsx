import { useDispatch } from "react-redux";
import { auth } from "../Firebase/Firebase.config";
import { signOut } from "firebase/auth";
import { logoutUser } from "../redux/features/auth/authSlice";

const useSignOut = () => {
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(logoutUser());
      })
      .catch((error) => {
        console.error("Sign-out error:", error);
      });
  };

  return handleSignOut;
};

export default useSignOut;
