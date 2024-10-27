import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetWishlistdataByEmailQuery,
  useRemoveFromWishlistMutation,
} from "../../redux/features/wishlist/wishlistApi";
import { FaShoppingBag, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useGetCartdataByEmailQuery } from "../../redux/features/cart/cartApi";
import BookingModal from "../../Components/BookingModal/BookingModal";

const MyWishlist = () => {
  const user = useSelector((state) => state.auth.user);
  const { data: wishlistData, refetch } = useGetWishlistdataByEmailQuery(
    user?.email
  );
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const { data: cartData } = useGetCartdataByEmailQuery(user?.email);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleDelete = (wishlist) => {
    Swal.fire({
      title: "Are you sure you want to delete this item?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromWishlist(wishlist._id).then(() => {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Item has been deleted.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        });
      }
    });
  };

  const handleAddToCart = (wishlist) => {
    const isInCart = cartData?.some(
      (cartItem) => cartItem.productId === wishlist.productId
    );

    if (isInCart) {
      Swal.fire({
        icon: "info",
        title: "Already in Cart",
        text: "This item is already in your cart!",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      setSelectedItem(wishlist); // Pass the wishlist data
      setIsModalOpen(true);
    }
  };

  return (
    <div className="m-12">
      {wishlistData?.length > 0 ? (
        <>
          <h1 className="text-2xl sm:text-4xl font-bold flex justify-center items-center">
            My Wishlist : {wishlistData.length}
          </h1>
          <div className="mt-9 overflow-x-auto shadow-md sm:rounded-lg">
            <table className="min-w-full font-light">
              <thead className="bg-gray-700 text-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    #
                  </th>
                  <th scope="col" className="text-lg text-center px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="text-lg text-center px-6 py-3">
                    Item Name
                  </th>
                  <th scope="col" className="text-lg text-center px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="text-lg text-center px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-center">
                {wishlistData.map((wishlist, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 text-black font-medium">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-black font-medium">
                      {wishlist.username}
                    </td>
                    <td className="px-6 py-4 flex justify-center">
                      <img
                        alt="item"
                        className="w-12 h-12 xl:w-20 xl:h-20 bg-gray-100 object-cover rounded-full"
                        src={wishlist.image}
                      />
                    </td>
                    <td className="px-6 py-4 text-black font-medium">
                      {wishlist.item_name}
                    </td>
                    <td className="px-6 py-4 text-black font-medium">
                      ${wishlist.price}
                    </td>
                    <td>
                      <div className="flex justify-center items-center">
                        <button
                          onClick={() => handleAddToCart(wishlist)}
                          className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-700"
                        >
                          <FaShoppingBag />
                        </button>
                        <button
                          onClick={() => handleDelete(wishlist)}
                          className="bg-red-500 text-white px-4 py-3 hover:bg-red-700 rounded-lg ms-2"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isModalOpen && (
            <BookingModal
              item={selectedItem}
              closeModal={() => setIsModalOpen(false)}
            />
          )}
        </>
      ) : (
        <div className="flex justify-center items-center mt-8">
          <p className="text-xl text-black font-semibold">No wishlist found</p>
        </div>
      )}
    </div>
  );
};

export default MyWishlist;
