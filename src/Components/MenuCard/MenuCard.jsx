// import React from "react";
// import { useAddToCartMutation } from "../../redux/features/cart/cartApi";
// import { useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// const MenuCard = ({ item }) => {
//   const [addToCart] = useAddToCartMutation();
//   const user = useSelector((state) => state.auth.user);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleAddToCart = () => {
//     if (user && user.email) {
//       const cartItem = {
//         productId: item._id,
//         item_name: item.item_name,
//         price: item.price,
//         image: item.image,
//         name: item.name,
//         email: user.email,
//       };

//       addToCart(cartItem)
//         .unwrap()
//         .then(() => {
//           Swal.fire({
//             position: "top-end",
//             icon: "success",
//             title: "Food added to the cart.",
//             showConfirmButton: false,
//             timer: 1500,
//           });
//         })
//         .catch((error) => {
//           console.error("Error adding to cart:", error);
//         });
//     } else {
//       Swal.fire({
//         title: "Please login to order the food",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Login Now",
//       }).then((result) => {
//         if (result.isConfirmed) {
//           navigate("/login", { state: { from: location } });
//         }
//       });
//     }
//   };

//   return (
//     <div
//       key={item._id}
//       className="bg-[#F3F3F3] w-full h-full flex flex-col justify-between"
//     >
//       <div className="relative w-full h-56">
//         <img
//           className="w-full h-full object-cover object-center"
//           src={item.image}
//           alt={item.item_name}
//         />
//         <h4 className="absolute top-2 right-2 bg-black text-white text-[20px] font-medium mb-3 px-2 py-1">
//           ${item.price}
//         </h4>
//       </div>
//       <div className="p-4 flex flex-col justify-between items-center">
//         <h2 className="text-[24px] font-semibold mb-2">{item.item_name}</h2>
//         <div className="flex justify-center mt-4">
//           <button
//             onClick={handleAddToCart}
//             className="bg-[#E8E8E8] text-[#BB8506] border-b-2 border-[#BB8506] px-5 py-2 text-lg font-medium"
//           >
//             Add to Cart
//           </button>
//           <button className="bg-[#E8E8E8] ms-3 text-[#BB8506] border-b-2 border-[#BB8506] px-5 py-2 text-lg font-medium">
//             Add to Wishlist
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MenuCard;

// MenuCard.js
// MenuCard.js
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BookingModal from "../BookingModal/BookingModal";

const MenuCard = ({ item }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCartClick = () => {
    if (user && user.email) {
      setIsModalOpen(true);
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

  return (
    <div
      key={item._id}
      className="bg-[#F3F3F3] w-full h-full flex flex-col justify-between"
    >
      <div className="relative w-full h-56">
        <img
          className="w-full h-full object-cover object-center"
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
            onClick={handleAddToCartClick}
            className="bg-[#E8E8E8] text-[#BB8506] border-b-2 border-[#BB8506] px-5 py-2 text-lg font-medium"
          >
            Add to Cart
          </button>
          <button className="bg-[#E8E8E8] ms-3 text-[#BB8506] border-b-2 border-[#BB8506] px-5 py-2 text-lg font-medium">
            Add to Wishlist
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && <BookingModal closeModal={closeModal} item={item} />}
    </div>
  );
};

export default MenuCard;
