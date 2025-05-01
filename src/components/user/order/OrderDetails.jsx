import React, { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";

const OrderDetails = ({ order, onClose, onUpdateStatus }) => {
  const [cancelReasons, setCancelReasons] = useState([]);
  const [customReason, setCustomReason] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);
  const { updateUser } = useAuth();

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

  const handleConfirmCancel = () => {
    const finalReason =
      cancelReasons.includes("Other") && customReason
        ? [...cancelReasons.filter((r) => r !== "Other"), customReason].join(", ")
        : cancelReasons.join(", ");

    onUpdateStatus(order.id, "Cancelled", finalReason || "Unspecified reason").then(
      (updatedUser) => {
        updateUser(updatedUser);
        onClose();
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-4 w-[700px] rounded-4xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-lg font-bold"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">
          Order Details #{order.id}
        </h2>

        {/* Progress Bar */}
        <div className="mt-4">
          <p className="font-semibold mb-1">Order Progress:</p>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="h-2 transition-all duration-500"
              style={{
                width:
                  order.status === "Delivered"
                    ? "100%"
                    : order.status === "Shipping"
                    ? "75%"
                    : order.status === "Pending"
                    ? "50%"
                    : order.status === "Ordered"
                    ? "25%"
                    : order.status === "Cancelled"
                    ? "100%"
                    : "0%",
                backgroundColor:
                  order.status === "Cancelled" ? "#F87171" : "#10B981",
              }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>Ordered</span>
            <span>Processing</span>
            <span>Shipping</span>
            <span>{order.status === "Cancelled" ? "Cancelled" : "Completed"}</span>
          </div>
        </div>

        <p className="mb-2">Order Date: {new Date(order.date).toLocaleString()}</p>

        <div className="mb-4">
          <p className="font-semibold">Products:</p>
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 mt-2">
              <img src={item.img} className="w-16 h-16" alt={item.name} />
              <div>
                <p>{item.name}</p>
                <p>
                  {item.quantity} x {item.price}₫
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mb-2">
          <span className="font-semibold">Status:</span> {order.status}
        </p>

        {order.status !== "Cancelled" && !isCancelling && (
          <button
            onClick={() => setIsCancelling(true)}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cancel Order
          </button>
        )}

        {isCancelling && (
          <div className="mt-4">
            <p className="text-red-600 font-semibold mb-2">
              Select cancellation reasons:
            </p>
            {[
              "Changed my mind",
              "Item not received",
              "Shipping is too slow",
              "Other",
            ].map((reason) => (
              <label key={reason} className="block">
                <input
                  type="checkbox"
                  checked={cancelReasons.includes(reason)}
                  onChange={() => handleCheckboxChange(reason)}
                  className="mr-2"
                />
                {reason}
              </label>
            ))}

            {cancelReasons.includes("Other") && (
              <input
                type="text"
                placeholder="Enter your custom reason"
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                className="mt-2 w-full border px-2 py-1 rounded"
              />
            )}

            <button
              onClick={handleConfirmCancel}
              disabled={
                cancelReasons.length === 0 ||
                (cancelReasons.includes("Other") && !customReason)
              }
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Confirm Cancellation
            </button>
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
