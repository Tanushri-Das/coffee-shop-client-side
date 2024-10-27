import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  useGetCartdataByEmailQuery,
  useRemoveFromCartMutation,
  useUpdateCartMutation,
} from "../../redux/features/cart/cartApi";
import { useSelector } from "react-redux";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { GoPlusCircle } from "react-icons/go";
import { FiMinusCircle } from "react-icons/fi";
import EditCartModal from "../../Components/EditCartModal/EditCartModal";

const MyCart = () => {
  const user = useSelector((state) => state.auth.user);
  const {
    data: cartData,
    error,
    isLoading,
    refetch,
  } = useGetCartdataByEmailQuery(user?.email);
  const [removeFromCart] = useRemoveFromCartMutation();
  const [updateCart] = useUpdateCartMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null); // State for the selected booking

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading cart data</div>;

  const handleDelete = (booking) => {
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
        removeFromCart(booking._id).then(() => {
          refetch(); // Refetch data after successful deletion
          Swal.fire({
            title: "Deleted!",
            text: "Your item has been deleted.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        });
      }
    });
  };

  const handleIncrease = async (booking) => {
    await updateCart({
      id: booking._id,
      quantity: booking.quantity + 1,
      address: booking.address, // Pass address
      phone: booking.phone, // Pass phone
      countryCode: booking.countryCode, // Pass countryCode
    });
    refetch(); // Refetch data after quantity increase
  };

  const handleDecrease = async (booking) => {
    if (booking.quantity > 1) {
      await updateCart({
        id: booking._id,
        quantity: booking.quantity - 1,
        address: booking.address, // Pass address
        phone: booking.phone, // Pass phone
        countryCode: booking.countryCode, // Pass countryCode
      });
      refetch(); // Refetch data after quantity decrease
    }
  };

  const handleEdit = (booking) => {
    setSelectedBooking(booking); // Set the selected booking to state
    setIsModalOpen(true); // Open the edit modal
  };

  // Calculate the total amount
  const totalAmount = cartData?.reduce((total, booking) => {
    return total + booking.price * booking.quantity;
  }, 0);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null); // Reset selected booking
  };

  return (
    <div className="m-12">
      {cartData?.length > 0 ? (
        <>
          <h1 className="text-2xl sm:text-4xl font-bold flex justify-center items-center">
            My Cart : {cartData.length}
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
                    Quantity
                  </th>
                  <th scope="col" className="text-lg text-center px-6 py-3">
                    Phone
                  </th>
                  <th scope="col" className="text-lg text-center px-6 py-3">
                    Address
                  </th>
                  <th scope="col" className="text-lg text-center px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-center">
                {cartData.map((booking, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-black text-[16px] font-medium">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-black text-[16px] font-medium">
                      {booking.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex justify-center font-medium">
                      <img
                        src={booking.image}
                        alt=""
                        className="w-24 h-24 rounded-full"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-black text-[16px] font-medium">
                      {booking.item_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-black text-[16px] font-medium">
                      ${booking.price * booking.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-black text-[16px] font-medium">
                      <div className="flex justify-center items-center">
                        <FiMinusCircle
                          onClick={() => handleDecrease(booking)}
                          className="text-2xl hover:cursor-pointer"
                        />
                        <h2 className="ms-5 me-[22px] text-black text-[16px] font-medium">
                          {booking.quantity}
                        </h2>
                        <GoPlusCircle
                          onClick={() => handleIncrease(booking)}
                          className="text-2xl hover:cursor-pointer"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-black text-[16px] font-medium">
                      +{booking.countryCode}-{booking.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-black text-[16px] font-medium">
                      {booking.address}
                    </td>
                    <td>
                      <div className="flex justify-center items-center">
                        <button
                          onClick={() => handleEdit(booking)} // Call handleEdit when clicked
                          className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-700"
                        >
                          <FaPencilAlt />
                        </button>
                        <button
                          onClick={() => handleDelete(booking)}
                          className="bg-red-500 text-white px-4 py-3 hover:bg-red-700 rounded-lg ms-2"
                        >
                          <FaTrashAlt className="text-lg" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Total Amount */}
          <div className="flex justify-center mt-6">
            <h2 className="text-xl font-bold">
              Total Amount : ${totalAmount.toFixed(2)}
            </h2>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center mt-8">
          <p className="text-xl text-black font-semibold">No cart found</p>
        </div>
      )}
      {/* Modal */}
      {isModalOpen && (
        <EditCartModal
          closeModal={closeModal}
          booking={selectedBooking}
          refetch={refetch}
        />
      )}{" "}
      {/* Pass the selected booking */}
    </div>
  );
};

export default MyCart;
