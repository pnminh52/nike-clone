import React, { useState } from "react";

const PopUpDelete = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  const [isChecked, setIsChecked] = useState(false);
const handleCancel=()=>{
    onClose()
}
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 ">
      <div className="relative bg-white py-12 px-10  max-w-lg rounded-3xl">
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
        <p className="text-xl font-semibold mb-4">
          Are you sure you want to delete your Nike Member Profile?
        </p>
        <p className="inter">As a Nike Member you currently get:</p>
       <div className="py-2">
        <li className="ml-5 text-sm">Free returns on all orders</li>
        <li className="ml-5 text-sm">Express checkout every time you shop</li>
        <li className="ml-5 text-sm">A personal Wishlist to save items</li>
        <li className="ml-5 text-sm">Easy order tracking</li>
        <li className="ml-5 text-sm">Access to activity tracking via Nike⁠ Membership</li>
       </div>
        <p className="inter">By Deleting Your Profile:</p>
        <div className="py-2">
        <ul className="list-disc ml-5">
        <li className=" text-sm whitespace-normal break-words max-w-md">
    You will no longer have access to your Nike.com or Nike⁠ Member profile.
  </li>
  <li className="text-sm whitespace-normal break-words max-w-md">
    Information related to orders will be available by contacting consumer services.
  </li>
  <li className="text-sm whitespace-normal break-words max-w-md">
    Your mobile app data will be accessible until you log out or uninstall the app.
  </li>
        </ul>

        </div>
       
        <p className="inter">
          Information shared on social networks or platforms outside of Nike.com
          will not be affected.
        </p>
        <label className="flex items-center space-x-2 py-2">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
             className="appearance-none transition duration-300 ease-in-out cursor-pointer w-6 h-6 bg-white border-2 border-gray-400 rounded-md checked:bg-black checked:border-black focus:outline-none"
          />
          <span className="text-sm">Yes, I want delete my Nike account. I cannot undo this action.</span>
        </label>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onConfirm}
            disabled={!isChecked}
            className={`px-4 py-1.5 rounded text-black cursor-pointer ${
              isChecked
                ? "border border-gray-400 text-black inter rounded-full hover:border-black "
                : "border border-gray-400 text-gray-400 inter rounded-full  cursor-not-allowed"
            }`}
          >
            Delete My Account
          </button>
          <button
            onClick={onClose}
            className="bg-black text-white px-4 py-1.5 rounded-full hover:bg-gray-800 inter cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpDelete;
