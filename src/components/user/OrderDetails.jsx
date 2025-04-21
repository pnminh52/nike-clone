import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

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
      cancelReasons.includes("Khác") && customReason
        ? [...cancelReasons.filter((r) => r !== "Khác"), customReason].join(", ")
        : cancelReasons.join(", ");

    onUpdateStatus(order.id, "Cancelled", finalReason || "Không rõ lý do").then(
      (updatedUser) => {
        updateUser(updatedUser);
        onClose();
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-4  w-[700px] rounded-4xl  relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-lg font-bold"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">
          Chi tiết đơn hàng #{order.id}
        </h2>
        {/* Progress Bar */}
<div className="mt-4">
  <p className="font-semibold mb-1">Tiến trình đơn hàng:</p>
  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
    <div
      className="h-2 bg-green-500 transition-all duration-500"
      style={{
        width:
          order.status === "Đã giao"
            ? "100%"
            : order.status === "Đang giao"
            ? "75%"
            : order.status === "Đang xử lý"
            ? "50%"
            : order.status === "Đã đặt hàng"
            ? "25%"
            : order.status === "Đã hủy"
            ? "100%"
            : "0%",
        backgroundColor: order.status === "Đã hủy" ? "#F87171" : "#10B981", // đỏ nếu hủy, xanh nếu bình thường
      }}
    ></div>
  </div>
  <div className="flex justify-between text-xs text-gray-600 mt-1">
    <span>Đặt hàng</span>
    <span>Xử lý</span>
    <span>Giao hàng</span>
    <span>
      {order.status === "Đã hủy" ? "Đã hủy" : "Hoàn tất"}
    </span>
  </div>
</div>


        <p className="mb-2">
          Ngày đặt: {new Date(order.date).toLocaleString()}
        </p>

        <div className="mb-4">
          <p className="font-semibold">Sản phẩm:</p>
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 mt-2">
              <img src={item.img} className="w-16 h-16" alt={item.name} />
              <div>
                <p>{item.name}</p>
                <p>
                  {item.quantity} x {item.price}đ
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mb-2">
          <span className="font-semibold">Trạng thái:</span> {order.status}
        </p>

        {order.status !== "Đã hủy" && !isCancelling && (
          <button
            onClick={() => setIsCancelling(true)}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Hủy đơn
          </button>
        )}

        {isCancelling && (
          <div className="mt-4">
            <p className="text-red-600 font-semibold mb-2">
              Chọn lý do hủy đơn:
            </p>
            {["Đổi ý", "Không nhận được hàng", "Thời gian giao lâu", "Khác"].map(
              (reason) => (
                <label key={reason} className="block">
                  <input
                    type="checkbox"
                    checked={cancelReasons.includes(reason)}
                    onChange={() => handleCheckboxChange(reason)}
                    className="mr-2"
                  />
                  {reason}
                </label>
              )
            )}

            {cancelReasons.includes("Khác") && (
              <input
                type="text"
                placeholder="Nhập lý do khác"
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                className="mt-2 w-full border px-2 py-1 rounded"
              />
            )}

            <button
              onClick={handleConfirmCancel}
              disabled={
                cancelReasons.length === 0 ||
                (cancelReasons.includes("Khác") && !customReason)
              }
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Xác nhận hủy đơn
            </button>
          </div>
        )}

        {order.status === "Đã hủy" && order.cancelReason && (
          <div className="mt-4 text-sm text-gray-700 border-t pt-2">
            <p>
              <span className="font-semibold">Lý do hủy:</span>{" "}
              {order.cancelReason}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
