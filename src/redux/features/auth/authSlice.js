import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null, // Load user from local storage
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Store user in local storage
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user"); // Remove user from local storage on logout
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { loginUser, logoutUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
