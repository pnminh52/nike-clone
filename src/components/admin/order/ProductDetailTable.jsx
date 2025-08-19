import React, { useState } from "react";
import CancelModal from "./CancelModal";

const ProductDetailTable = ({ order, orderStatusList, currentIndex, isFinalStatus, handleChangeStatus }) => {
  const cancelReasons = [
    "Customer changed their mind",
    "Out of stock",
    "Invalid customer information",
  ];
  

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState([]);

  const handleStatusChange = (newStatus) => {
    if (newStatus === "Cancelled") {
      setShowCancelModal(true);
    } else {
      handleChangeStatus(newStatus);
    }
  };

  const confirmCancel = () => {
    if (cancelReason.length === 0) {
      alert("Please select at least one reason for cancellation!");
      return;
    }
    handleChangeStatus("Cancelled", cancelReason);
    setShowCancelModal(false);
    setCancelReason([]);
  };
  

  return (
    <div className="overflow-x-auto p-4 border-gray-300 border bg-white rounded-2xl">
      <table className="w-full border border-gray-300-collapse">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">#</th>
            <th className="border border-gray-300 p-2">Product</th>
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Size / Quantity / Price</th>
            <th className="border border-gray-300 p-2">Fee</th>
            <th className="border border-gray-300 p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items?.map((item, idx) => (
            <tr key={idx} className="text-center hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{idx + 1}</td>
              <td className="border border-gray-300 p-2 text-left">{item.name}</td>
              <td className="border border-gray-300 p-2">
                <img
                  className="w-22 h-22 rounded-lg mx-auto object-cover"
                  src={item.img}
                  alt={item.name}
                />
              </td>
              <td className="border border-gray-300 p-2">
                {item.size} / {item.quantity} /{" "}
                {Number(item.price).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
              <td className="border border-gray-300 p-2">
                {Number(order.shippingFee).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
              <td className="border border-gray-300 p-2">
                {(item.quantity * item.price).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between mt-4">
       <div className="flex items-center gap-2">
         <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="border border-gray-300 px-3 py-2 rounded-lg"
                  disabled={isFinalStatus}
                >
                  {orderStatusList.map((status, sIdx) => {
                    const isCurrent = sIdx === currentIndex;
                    const isNext = sIdx === currentIndex + 1;
                    return (
                      <option
                        key={status.id}
                        value={status.name}
                        disabled={
                          isFinalStatus ||
                          (status.name !== "Cancelled" && !isCurrent && !isNext)
                        }
                      >
                        {status.name}
                      </option>
                    );
                  })}
                </select>
                {order.status === "Cancelled" && order.cancelReasons?.length > 0 && (
  <p className="text-sm text-red-600">
    Cancelled reason: {order.cancelReasons.join(", ")}
  </p>
)}

       </div>

        <div className="inter">
          Total:{" "}
          {order.items
            ?.reduce((sum, item) => sum + item.price * item.quantity, 0)
            .toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
        </div>
      </div>

      {showCancelModal && (
        <CancelModal
          cancelReasons={cancelReasons}
          cancelReason={cancelReason}
          setCancelReason={setCancelReason}
          onClose={() => setShowCancelModal(false)}
          onConfirm={confirmCancel}
        />
      )}
    </div>
  );
};

export default ProductDetailTable;
