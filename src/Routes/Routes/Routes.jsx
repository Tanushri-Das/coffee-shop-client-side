import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";
import Menu from "../../Pages/Menu/Menu";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import DashboardLayout from "../../Layout/DashboardLayout";
import AddReview from "../../Pages/Dashboard/AddReview/AddReview";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import MyCart from "../../Pages/Dashboard/MyCart/MyCart";
import MyWishlist from "../../Pages/Dashboard/MyWishlist/MyWishlist";

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
    ],
  },
  {
    path: "/",
    element:<PrivateRoutes><DashboardLayout /></PrivateRoutes>,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/myCart",
        element: <MyCart />,
      },
      {
        path: "/dashboard/myWishlist",
        element: <MyWishlist />, 
      },
      {
        path: "/dashboard/addReview",
        element: <AddReview />, 
      },
      
    ],
  },
]);
export default routes;
