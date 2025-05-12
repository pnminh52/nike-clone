import React, { useState } from "react";
import { toast } from "react-toastify";
import useToast from "../../../../hooks/useToast";

const PopUpPhoneChange = ({ isOpen, onClose, currentPhone, onSave }) => {
  const [newPhone, setNewPhone] = useState(currentPhone);
  const {successToast, errorToast, warningToast} = useToast();
  const isChanged =
  newPhone !== "";
const handleCancel=()=>{
  onClose();
}
  // Hàm kiểm tra tính hợp lệ của số điện thoại
  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; // Giả sử số điện thoại hợp lệ có 10 chữ số
    return phoneRegex.test(phone);
  };

  const handleSave = () => {
    if (!newPhone || !validatePhone(newPhone)) {
      errorToast("Số điện thoại không hợp lệ!");
      return;
    }
    onSave(newPhone);
    successToast("Số điện thoại đã được cập nhật thành công!");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="relative bg-white py-12 px-10  max-w-lg w-full rounded-3xl">
      <div className="absolute top-4 right-4">
            <button
              onClick={handleCancel}
              type="button"
              className="w-8 h-8 cursor-pointer bg-gray-200 rounded-full"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M7 17L16.8995 7.10051" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M7 7.00001L16.8995 16.8995" stroke="#000000" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
          </div>
        <h2 className='text-2xl  '>Change Phone Number</h2>
        <div className="py-4 space-y-2">
          <input
            type="number"
            value={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
            className={`block h-14 rounded-lg p-3.5 text-lg w-full text-gray-900 bg-transparent border appearance-none focus:outline-none focus:ring-0 peer`}
            placeholder="Enter new phone number"
          />
          <p className="text-sm text-red-600">Bạn không thể thực hiện tác vụ này sau 30 ngày*</p>
        </div>
        <div className="flex justify-end gap-4">
        <button
  onClick={handleSave}
  className={`rounded-full inter px-4 py-1.5 ${isChanged ? 'bg-black text-white' : 'text-[#CDCDCE] bg-[#E5E5E5] cursor-not-allowed'}`}
  disabled={!isChanged}
>
Save
</button>
        </div>
      </div>
    </div>
  );
};

export default PopUpPhoneChange;
