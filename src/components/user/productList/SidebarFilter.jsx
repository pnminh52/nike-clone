import React, { useState } from 'react';

const SidebarFilter = ({ 
  genderFilter, 
  setGenderFilter, 
  isUnder1000000, 
  setIsUnder1000000,
  
}) => {
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);

  const toggleGenderDropdown = () => setIsGenderDropdownOpen(!isGenderDropdownOpen);
  const togglePriceDropdown = () => setIsPriceDropdownOpen(!isPriceDropdownOpen);

  const handleGenderCheckboxChange = (e) => {
    const value = e.target.value;
    // Nếu giá trị đã được chọn, xóa khỏi mảng (đảm bảo chỉ chọn một giá trị)
    if (e.target.checked) {
      setGenderFilter([value]); // Thêm vào mảng, chỉ giữ một giá trị duy nhất
    } else {
      setGenderFilter([]); // Xóa nếu bỏ chọn
    }
  };

  const handlePriceCheckboxChange = (e) => {
    setIsUnder1000000(e.target.checked); // Chỉ cho phép một lựa chọn
  };

  return (
    <div className="mb-4">
      {/* Gender Dropdown */}
      <div className="mb-3">
        <div className="">
          <button
            className="w-full p-2 mt-2  border-t flex justify-between items-center"
            onClick={toggleGenderDropdown}
          >
          Gender
            <svg
              className={`w-5 h-5 cursor-pointer transform transition-transform ${isGenderDropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isGenderDropdownOpen && (
            <div className="bg-white   w-full mt-1 p-2">
              {['Men', 'Women', 'Unisex'].map((gender) => (
                <label key={gender} className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    value={gender}
                    checked={genderFilter.includes(gender)}
                    onChange={handleGenderCheckboxChange}
                    className="form-checkbox w-4 h-4"
                  />
                  <span>{gender}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Price Dropdown */}
      <div className="mb-3">
        <div className="">
          <button
            className="w-full p-2 mt-2  border-t flex justify-between items-center"
            onClick={togglePriceDropdown}
          >
           Price
            <svg
              className={`w-5 h-5 cursor-pointer transform transition-transform ${isPriceDropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isPriceDropdownOpen && (
            <div className="bg-white   w-full mt-1 p-2">
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={isUnder1000000}
                  onChange={handlePriceCheckboxChange}
                  className="form-checkbox w-4 h-4"
                />
                <span>Under 1,000,000 VND</span>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarFilter;
