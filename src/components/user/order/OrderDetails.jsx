import React, { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";

const OrderDetails = ({ users,order, onClose, onUpdateStatus }) => {
  // console.log(users);
  
  const [cancelReasons, setCancelReasons] = useState([]);
  const [customReason, setCustomReason] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);
  const { updateUser } = useAuth();
  const [dropdownInfo, setDropdownInfo]=useState(false)

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
<div className="bg-white relative min-h-[90vh] w-full max-w-xl p-6 rounded-3xl overflow-y-auto shadow-xl hide-scrollbar">
  
  
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
      
       
        <div className=" justify-center text-center mt-5 mb-5">
  <p className="text-2xl font-semibold"> Order Details</p>
  <p className="w-full flex justify-center text-gray-400 ">{new Date(order.date).toLocaleString()}</p>

</div>

       <div onClick={()=>setDropdownInfo(!dropdownInfo)} className="border-b cursor-pointer flex justify-between px-6 items-center border-t  py-4 border-gray-300">
        <p className="text-2xl">User Info</p>
        <div className="flex gap-2 items-center">
        <p className="px-3 py-0.5  rounded-full bg-green-100 inter text-green-400 ">
           {order.status}
           </p>
        <svg  className={`w-5 h-5 cursor-pointer transform transition-transform ${
    dropdownInfo ? "rotate-180" : ""
  }`} fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg>
        </div>
       </div>
       {
        dropdownInfo&&(
          <div>
            <div className="mt-3 space-y-1 px-6 ">
            <p><span className="inter">Username:</span> {users.firstname} {users.lastname}</p>
<p><span className="inter">Phone:</span> {users.phone}</p>
<p><span className="inter">Email:</span> {users.email}</p>
<p><span className="inter">City:</span> {users.address}</p>
<p><span className="inter">District:</span> {users.district}</p>

          </div>
         
          </div>
        )
       }

      
       <div className="">
     
      
        <div className="space-y-4 px-6 py-4">
         
          {order.items.map((item, index) => (
          <div
          key={item.id}
          className={`flex w-full py-0 gap-4 ${
            index !== order.items.length - 1 ? "" : ""
          }`}
        >
        
              <img src={item.img} className="aspect-square w-40 h-auto object-cover" alt={item.name} />
              <div className="">
                <p className="">{item.name}</p>
                <p className=" text-gray-400 ">
                  Quantity {item.quantity}  
                </p>
               <p className="text-gray-400">EU{item.size}  </p>
               
             
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
<div className="px-6">
<button
  onClick={() => setIsCancelling(true)}
  className="w-full mt-0 inter cursor-pointer bg-white border border-red-600 text-red-600 py-4 rounded-full hover:bg-gray-800 transition"
>
 Cancel Order
</button>
</div>
        )}
        
       
        

        {isCancelling && (
          <div className="px-6">
            <p className="text-red-600 inter ">
              Select cancellation reasons:
            </p>
            <div className="py-2 space-y-1">
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
                placeholder="Enter your custom reason..."
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                className=" w-full border px-4 py-8 rounded-lg mb-4"
              />
            )}
<div className="space-y-2">
  
<button
              onClick={handleConfirmCancel}
              disabled={
                cancelReasons.length === 0 ||
                (cancelReasons.includes("Other") && !customReason)
              }
              className="w-full mt-0 inter cursor-pointer bg-white border border-red-600 text-red-600 py-4 rounded-full hover:bg-gray-800 transition"
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
  );
};

export default OrderDetails;
