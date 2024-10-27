import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Menu from "../Pages/Menu/Menu";
import MyCart from "../Pages/MyCart/MyCart";
import MyWishlist from "../Pages/MyWishlist/MyWishlist";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/myCart",
        element: <MyCart />,
      },
      {
        path: "/myWishlist",
        element: <MyWishlist />,
      },
    ],
  },
]);
export default routes;
