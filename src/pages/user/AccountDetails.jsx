import React, { useState } from "react";
import PopUpDelete from "../../components/user/setting/accountDetails/PopUpDelete";
import PopUpPasswordChange from "../../components/user/setting/accountDetails/PopUpPasswordChange";
import PopUpPhoneChange from "../../components/user/setting/accountDetails/PopUpPhoneChange";
import useAccountDetails from "../../hooks/useAccountDetails";

const AccountDetails = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    phone,
    setPhone,
    address,
    setAddress,
    district,
    setDistrict,
    dateOfBirth,
    setDateOfBirth,
    handleUpdate,
    handleDelete,
    isChanged,
  } = useAccountDetails();
  const provinces = [
    "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu",
    "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước",
    "Bình Thuận", "Cà Mau", "Cần Thơ", "Cao Bằng", "Đà Nẵng",
    "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp",
    "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh",
    "Hải Dương", "Hải Phòng", "Hậu Giang", "Hòa Bình", "Hưng Yên",
    "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng",
    "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An",
    "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình",
    "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng",
    "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa",
    "Thừa Thiên Huế", "Tiền Giang", "TP Hồ Chí Minh", "Trà Vinh", "Tuyên Quang",
    "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
  ];
  const [showPopup, setShowPopup] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [showPhonePopup, setShowPhonePopup] = useState(false);

  return (
    <div>
      <p className="text-xl">Account Details</p>

      {/* Email Field */}
      <div className="py-4">
        <div className="relative z-0 w-full group">
          <input
            className="block h-15.5 rounded-lg p-3.5 text-lg w-full text-gray-900 bg-transparent border appearance-none focus:outline-none focus:ring-0 peer"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          />
          <label
            className="absolute text-lg inter rounded-lg duration-300 transform -translate-y-4 scale-75 top-1.5 bg-white px-1 z-10 origin-[0] left-3
              peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-focus:scale-75 peer-focus:-translate-y-4"
          >
            Email*
          </label>
        </div>
      </div>

      {/* Password Field */}
      <div className="flex justify-between items-center">
        <div className="w-full">
          <label className="block inter">Password</label>
          <div className="flex justify-between items-center py-4">
            <p className="text-xs">{"•".repeat(password.length)}</p>
            <button
              onClick={() => setShowPasswordPopup(true)}
              className="text-sm inter underline ml-4 cursor-pointer"
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Phone Field */}
      <div>
        <label className="block inter">Phone Number</label>
        <div className="flex justify-between items-center py-4">
          <p>
            <span>(+84) </span>
            {phone}
          </p>
          <button
            onClick={() => setShowPhonePopup(true)}
            className="text-sm inter underline ml-4 cursor-pointer"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Address Field */}
      <div className="py-4">
  <div className="relative z-0 w-full group">
    <select
      className="block h-15.5 rounded-lg p-3.5 text-lg w-full text-gray-900 bg-transparent border appearance-none focus:outline-none focus:ring-0 peer"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
    >
      <option value="" disabled hidden></option>
      {provinces.map((province) => (
        <option key={province} value={province}>
          {province}
        </option>
      ))}
    </select>
    <label
      className="absolute text-lg inter rounded-lg duration-300 transform -translate-y-4 scale-75 top-1.5 bg-white px-1 z-10 origin-[0] left-3
        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-focus:scale-75 peer-focus:-translate-y-4"
    >
      Address*
    </label>
  </div>
</div>


      {/* District Field */}
      <div className="py-4">
        <div className="relative z-0 w-full group">
          <input
            className="block h-15.5 rounded-lg p-3.5 text-lg w-full text-gray-900 bg-transparent border appearance-none focus:outline-none focus:ring-0 peer"
            placeholder=""
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            type="text"
          />
          <label
            className="absolute text-lg inter rounded-lg duration-300 transform -translate-y-4 scale-75 top-1.5 bg-white px-1 z-10 origin-[0] left-3
              peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-focus:scale-75 peer-focus:-translate-y-4"
          >
            District*
          </label>
        </div>
      </div>

      {/* Date of Birth */}
      <div>
        <label className="block inter">Date of Birth</label>
        <div className="flex gap-2 py-4">
          {/* Day */}
          <select
            value={dateOfBirth.day}
            onChange={(e) =>
              setDateOfBirth({ ...dateOfBirth, day: e.target.value })
            }
            className="border rounded-lg p-2 w-25"
          >
            <option value="">Day</option>
            {[...Array(31)].map((_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>

          {/* Month */}
          <select
            value={dateOfBirth.month}
            onChange={(e) =>
              setDateOfBirth({ ...dateOfBirth, month: e.target.value })
            }
            className="border rounded-lg p-2 w-25"
          >
            <option value="">Month</option>
            {[...Array(12)].map((_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>

          {/* Year */}
          <select
            value={dateOfBirth.year}
            onChange={(e) =>
              setDateOfBirth({ ...dateOfBirth, year: e.target.value })
            }
            className="border p-2 rounded-lg w-25"
          >
            <option value="">Year</option>
            {Array.from({ length: 100 }, (_, index) => (
              <option key={index} value={new Date().getFullYear() - index}>
                {new Date().getFullYear() - index}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Delete Account */}
      <div className="py-6">
        <div className="flex justify-between items-center border-t border-b border-gray-400 py-6">
          <p className="inter">Delete Account</p>
          <button
            onClick={() => setShowPopup(true)}
            className="bg-white cursor-pointer border text-black rounded-full border-gray-400 hover:border-black px-4 py-1.5"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="text-right">
        <button
          onClick={handleUpdate}
          className={`rounded-full cursor-pointer inter px-4 py-1.5 ${
            isChanged
              ? "bg-black text-white"
              : "text-[#CDCDCE] bg-[#E5E5E5] cursor-not-allowed"
          }`}
          disabled={!isChanged}
        >
          Save
        </button>
      </div>

      {/* Popups */}
      <PopUpDelete
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        onConfirm={handleDelete}
      />
      <PopUpPasswordChange
        isOpen={showPasswordPopup}
        onClose={() => setShowPasswordPopup(false)}
        currentPassword={password}
        onSave={async (newPassword) => {
          setPassword(newPassword);
          setShowPasswordPopup(false);
          await handleUpdate();
        }}
      />
      <PopUpPhoneChange
        isOpen={showPhonePopup}
        onClose={() => setShowPhonePopup(false)}
        currentPhone={phone}
        onSave={async (newPhone) => {
          setPhone(newPhone);
          setShowPhonePopup(false);
          await handleUpdate();
        }}
      />
    </div>
  );
};

export default AccountDetails;
