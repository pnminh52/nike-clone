import React, { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";

const OrderDetails = ({ users, order, onClose, onUpdateStatus }) => {
  // console.log(users);

  const [cancelReasons, setCancelReasons] = useState([]);
  const [customReason, setCustomReason] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);
  const { updateUser } = useAuth();
  const [dropdownInfo, setDropdownInfo] = useState(false)

  useEffect(() => {
    setCancelReasons([]);
    setCustomReason("");
    setIsCancelling(false);
  }, [order]);

  const handleCheckboxChange = (reason) => {
    if (cancelReasons.includes(reason)) {
      setCancelReasons(cancelReasons.filter((r) => r !== reason));
    } else {
      setCancelReasons([...cancelReasons, reason]);
    }
  };
  const formatPrice = (price) => {
    return Number(price)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const handleConfirmCancel = () => {
    const finalReason =
      cancelReasons.includes("Other") && customReason
        ? [...cancelReasons.filter((r) => r !== "Other"), customReason].join(", ")
        : cancelReasons.join(", ");

    // Tính tổng số điểm cần trừ cho tất cả các sản phẩm trong đơn hàng
    const totalDeduction = order.items.reduce((total, item) => {
      return total + (item.giftPoint * item.quantity); // Tính tổng điểm của từng sản phẩm
    }, 0);

    // Cập nhật trạng thái đơn hàng và trừ điểm của người dùng
    onUpdateStatus(order.id, "Cancelled", finalReason || "Unspecified reason").then(
      (updatedUser) => {
        // Trừ điểm từ tài khoản người dùng
        updatedUser.point -= totalDeduction;

        // Cập nhật lại thông tin người dùng sau khi trừ điểm
        updateUser(updatedUser);
        onClose();
      }
    );
  };


  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-2">
<div className="bg-white relative w-full max-w-xl p-6 rounded-3xl shadow-xl max-h-[90vh] flex flex-col">
  <div className="overflow-y-auto flex-1 hide-scrollbar">


        <div className="absolute top-4 right-4">
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 cursor-pointer bg-gray-200 rounded-full flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M7 17L16.8995 7.10051" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M7 7.00001L16.8995 16.8995" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div>
          <div className="mt-4 space-y-1  ">
              
            <p><span className="inter">Username:</span> {users.firstname} {users.lastname}</p>
            <p><span className="inter">Phone:</span> {users.phone}</p>
            <p><span className="inter">Email:</span> {users.email}</p>
            <p><span className="inter">City:</span> {users.address}</p>
            <p><span className="inter">District:</span> {users.district}</p>
{
              order.status === "Cancelled" && (
                <p><span className="inter">Cancelled reason:</span> {
                  order.cancelReasons?.length > 0
                    ? order.cancelReasons.join(", ")
                    : "No reason provided"
                }</p>

              )
}
          </div>

        </div>
        <div className="">


          <div className="space-y-4  py-4">

            {order.items.map((item, index) => (
              <div
                key={item.id}
                className={`flex w-full py-0 gap-2 ${index !== order.items.length - 1 ? "" : ""
                  }`}
              >

                <img src={item.img} className="aspect-square w-30 rounded-lg h-auto object-cover" alt={item.name} />
                <div className="">
                  <p className="">{item.name}</p>
                  <p className=" text-gray-400 ">
                    Quantity {item.quantity} / EU{item.size}
                  </p>

                  <p className="  ">
                    <span className=" ">  {formatPrice(item.price * (item.quantity ?? 1))}</span>
                    <span className="text-sm">₫</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>



        {order.status !== "Cancelled" && !isCancelling && (
          <div className="">
            <button
              onClick={() => setIsCancelling(true)}
              className="w-full mt-0 inter cursor-pointer bg-white border border-red-600 text-red-600 py-4 rounded-full "
            >
              Cancelled this Order
            </button>
          </div>
        )}




        {isCancelling && (
          <div className="">
            <p className="text-red-600  ">
              Why you want to cancellation this order?
            </p>
            <div className="py-2 space-y-1 text-sm">
              {[
                "Changed my mind",
                "Item not received",
                "Shipping is too slow",
                "Other",
              ].map((reason) => (
                <label key={reason} className="flex items-center space-x-2 py-1">

                  <input
                    type="checkbox"
                    checked={cancelReasons.includes(reason)}
                    onChange={() => handleCheckboxChange(reason)}
                    className="mr-2 appearance-none form-checkbox w-5 h-5 transition duration-300 ease-in-out cursor-pointer  bg-white border border-gray-400 rounded-md checked:bg-black checked:border-black focus:outline-none"

                  />
                  {reason}
                </label>
              ))}
            </div>


            {cancelReasons.includes("Other") && (
              <input
                type="text"
                placeholder="Enter your cancelled reason..."
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                className=" w-full border border-gray-300 px-4 py-6 rounded-lg mb-4"
              />
            )}
            <div className="space-y-2">

              <button
                onClick={handleConfirmCancel}
                disabled={
                  cancelReasons.length === 0 ||
                  (cancelReasons.includes("Other") && !customReason)
                }
                className="w-full mt-0 inter cursor-pointer bg-white border border-red-600 text-red-600 py-4 rounded-full "
              >
                Confirm Cancellation
              </button>
              <button onClick={() => setIsCancelling(false)} className="w-full inter mt-0 cursor-pointer bg-black text-white py-4 rounded-full hover:bg-gray-800 transition">
                Back
              </button>
            </div>
          </div>
        )}

        {order.status === "Cancelled" && order.cancelReason && (
          <div className="mt-4 text-sm text-gray-700 border-t pt-2">
            <p>
              <span className="font-semibold">Cancellation Reason:</span>{" "}
              {order.cancelReason}
            </p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default OrderDetails;
