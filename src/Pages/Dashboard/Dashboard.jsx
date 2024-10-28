import React from "react";
import { useSelector } from "react-redux";
import { useGetMenuQuery } from "../../redux/features/menu/menuApi";
import { FaBell, FaUtensils } from "react-icons/fa6";
import { FaShoppingBasket } from "react-icons/fa";
import { useGetCartdataByEmailQuery } from "../../redux/features/cart/cartApi";
import { useGetWishlistdataByEmailQuery } from "../../redux/features/wishlist/wishlistApi";
import "./Dashboard.css";
import PieChart from "../../Components/PieChart/PieChart";
import LineChart from "../../Components/LineChart/LineChart";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const { data: menuItems } = useGetMenuQuery();
  const { data: cartData } = useGetCartdataByEmailQuery(user?.email);
  const { data: wishlistData } = useGetWishlistdataByEmailQuery(user?.email);

  return (
    <div className="flex flex-col my-12">
      <h1 className="text-black text-4xl font-bold mb-6">
        Hi {user?.name}, Welcome Back!
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="flex menu items-center justify-center py-5 rounded-xl">
          <FaUtensils className="text-4xl text-white" />
          <div className="pl-5">
            <h5 className="text-white font-bold text-3xl mb-3">
              {menuItems?.length}
            </h5>
            <h5 className="text-white text-xl font-medium">Menu</h5>
          </div>
        </div>
        <div className="flex orders items-center justify-center py-5 rounded-xl">
          <FaShoppingBasket className="text-4xl text-white" />
          <div className="pl-5">
            <h5 className="text-white font-bold text-3xl mb-3">
              {cartData?.length}
            </h5>
            <h5 className="text-white text-xl font-medium">Orders</h5>
          </div>
        </div>
        <div className="flex wishlist items-center justify-center py-5 rounded-xl">
          <FaBell className="text-4xl text-white" />
          <div className="pl-5">
            <h5 className="text-white font-bold text-3xl mb-3">
              {wishlistData?.length}
            </h5>
            <h5 className="text-white text-xl font-medium">Wishlists</h5>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-between bg-white p-6 rounded-xl gap-x-8 mt-8">
        <LineChart menuItems={menuItems} />
        <div className="flex justify-center">
          <PieChart menuItems={menuItems} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
