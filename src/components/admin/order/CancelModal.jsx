import React from "react";

const CancelModal = ({ cancelReasons, cancelReason, setCancelReason, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-2">
    <div className="bg-white relative min-h-sm w-full max-w-sm p-6 rounded-3xl overflow-y-auto shadow-xl hide-scrollbar">
      
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
        <div className="py-5">
  {cancelReasons.map((reason, idx) => (
    <label key={idx} className="flex items-center mb-1">
      <input
        type="checkbox"
        value={reason}
        checked={cancelReason.includes(reason)}
        onChange={(e) => {
          if (e.target.checked) {
            setCancelReason([...cancelReason, reason]); // thêm lý do
          } else {
            setCancelReason(cancelReason.filter((r) => r !== reason)); // bỏ lý do
          }
        }}
        className="mr-2 appearance-none form-checkbox w-5 h-5 transition duration-300 ease-in-out cursor-pointer  bg-white border border-gray-400 rounded-md checked:bg-black checked:border-black focus:outline-none"
        />
      {reason}
    </label>
  ))}
</div>


      

        <div className="w-full ">
          
          <button
            onClick={onConfirm}
            className=" py-2  w-full cursor-pointer rounded-full bg-black text-white"
          >
           Cancelled this order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;
