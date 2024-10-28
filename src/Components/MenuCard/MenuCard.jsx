import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BookingModal from "../BookingModal/BookingModal";
import { useGetCartdataByEmailQuery } from "../../redux/features/cart/cartApi";
import {
  useAddToWishlistMutation,
  useGetWishlistdataByEmailQuery,
} from "../../redux/features/wishlist/wishlistApi";

const MenuCard = ({ item }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const location = useLocation();
  const { data: cartData, refetch: cartRefetch } = useGetCartdataByEmailQuery(
    user?.email
  );
  const { refetch: wishlistRefetch } = useGetWishlistdataByEmailQuery(
    user?.email
  );
  const [addToWishlist] = useAddToWishlistMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const isInCart = cartData?.some(
    (cartItem) => cartItem.productId === item._id
  );

  const handleAddToCart = () => {
    if (user && user.email) {
      if (isInCart) {
        Swal.fire({
          title: "Already in Cart",
          text: "This item is already in your cart.",
          icon: "info",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        setIsModalOpen(true);
      }
    } else {
      Swal.fire({
        title: "Please login to order the food",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddToWishlist = () => {
    if (user && user.email) {
      const newWishlist = {
        productId: item._id,
        item_name: item.item_name,
        price: item.price,
        image: item.image,
        quantity: 1,
        username: user.name,
        email: user.email,
      };
      addToWishlist(newWishlist)
        .unwrap()
        .then(() => {
          wishlistRefetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Menu added to wishlist",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/myWishlist");
        })
        .catch((error) => {
          console.error("Error placing wishlist:", error);
          Swal.fire({
            title: "Error!",
            text: "Something went wrong. Please try again.",
            icon: "error",
            confirmButtonText: "Retry",
          });
        });
    } else {
      Swal.fire({
        title: "Please login to add the item to your wishlist",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  return (
    <div
      key={item._id}
      className="bg-[#F3F3F3] w-full h-full flex flex-col justify-between px-3 pt-3"
    >
      <div className="relative w-full h-56">
        <img
          className="w-full h-full object-cover object-center rounded-lg"
          src={item.image}
          alt={item.item_name}
        />
        <h4 className="absolute top-2 right-2 bg-black text-white text-[20px] font-medium mb-3 px-2 py-1">
          ${item.price}
        </h4>
      </div>
      <div className="p-4 flex flex-col justify-between items-center">
        <h2 className="text-[24px] font-semibold mb-2">{item.item_name}</h2>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleAddToCart}
            className="bg-[#E8E8E8] text-[#BB8506] border-b-2 border-[#BB8506] px-5 py-2 text-lg font-medium"
          >
            Add to Cart
          </button>
          <button
            onClick={handleAddToWishlist}
            className="bg-[#E8E8E8] ms-3 text-[#BB8506] border-b-2 border-[#BB8506] px-5 py-2 text-lg font-medium"
          >
            Add to Wishlist
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <BookingModal
          closeModal={closeModal}
          item={item}
          cartRefetch={cartRefetch}
        />
      )}
    </div>
  );
};

export default MenuCard;
