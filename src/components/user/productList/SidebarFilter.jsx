import React, { useState } from "react";

const SidebarFilter = ({
  forFilter,
  setForFilter,
  heightFilter,
  setHeightFilter,
  statusFilter,
  setStatusFilter,
  colorFilter,
  setColorFilter,
  featuresFilter,
  setFeaturesFilter,
  technologyFilter,
  setTechnologyFilter,
  brandFilter,
  setBrandFilter,
  genderFilter,
  setGenderFilter,
  isUnder1000000,
  setIsUnder1000000,
}) => {
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);
  const [isTechnologyDropdownOpen, setIsTechnologyDropdownOpen] =useState(false);
  const [isFeaturesDropdownOpen, setIsFeaturesDropdownOpen] = useState(false);
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isHeightDropdownOpen, setIsHeightDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const toggleGenderDropdown = () =>
    setIsGenderDropdownOpen(!isGenderDropdownOpen);
  const togglePriceDropdown = () =>
    setIsPriceDropdownOpen(!isPriceDropdownOpen);
  const toggleBrandDropdown = () =>
    setIsBrandDropdownOpen(!isBrandDropdownOpen);
  const toggleTechnologyDropdown = () =>
    setIsTechnologyDropdownOpen(!isTechnologyDropdownOpen);
  const toggleFeaturesDropdown = () =>
    setIsFeaturesDropdownOpen(!isFeaturesDropdownOpen);
  const toggleColorDropdown = () =>
    setIsColorDropdownOpen(!isColorDropdownOpen);
  const toggleStatusDropdown = () =>
    setIsStatusDropdownOpen(!isStatusDropdownOpen);
  const toggleHeightDropdown = () =>
    setIsHeightDropdownOpen(!isHeightDropdownOpen);

  const handleGenderCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setGenderFilter([value]);
    } else {
      setGenderFilter([]);
    }
  };
  const handleBrandCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setBrandFilter([value]);
    } else {
      setBrandFilter([]);
    }
  };
  const handleTechnologyCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setTechnologyFilter([value]);
    } else {
      setTechnologyFilter([]);
    }
  };
  const handleFeaturesCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setFeaturesFilter([value]);
    } else {
      setFeaturesFilter([]);
    }
  };
  const handlePriceCheckboxChange = (e) => {
    setIsUnder1000000(e.target.checked);
  };
  const handleStatusCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setStatusFilter([value]);
    } else {
      setStatusFilter([]);
    }
  };
  const handleHeightCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setHeightFilter([value]);
    } else {
      setHeightFilter([]);
    }
  };
  const handleCategoryCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setForFilter(prev => [...prev, value]);
    } else {
      setForFilter(prev => prev.filter(item => item !== value));
    }
  };
  
  
  

  const getColorCode = (colorName) => {
    const colorMap = {
      Purple: "#8D429F",
      Black: "#000000",
      Red: "#E7352B",
      Orange: "#F36B26",
      Blue: "#1790C8",
      White: "#FFFFFF",
      Brown: "#825D41",
      Green: "#7BBA3C",
      Yellow: "#FED533",
      "Multi-Colour":
        "linear-gradient(135deg, #FF6B6B, #FFD93D, #6BCB77, #4D96FF)",
      Pink: "#F0728F",
    };

    return colorMap[colorName] || "#ccc";
  };

  return (
    <div className="">
      {/* Category Dropdown */}
      <div className="">
        <div className="">
          <button
            className="cursor-pointer w-full py-4 border-t inter border-gray-300 flex justify-between items-center"
            onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
          >
            Category
            <svg
              className={`w-5 h-5 mr-2 cursor-pointer transform transition-transform ${
                isCategoryDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isCategoryDropdownOpen && (
            <div className="bg-white w-full pb-4 pt-0">
              {[
                "Lifestyle",
                "Jordan",
                "Running",
                "Basketball",
                "Training & Gym",
                "Football",
                "Skateboarding",
                "Golf",
                "Boots",
                "Tennis",
                "Athletics",
                "Sandals, Slides",
              ].map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-2 mb-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={category}
                    checked={forFilter.includes(category)}
                    onChange={handleCategoryCheckboxChange}
                    className="appearance-none form-checkbox w-5 h-5 transition duration-300 ease-in-out cursor-pointer bg-white border border-gray-400 rounded-md checked:bg-black checked:border-black focus:outline-none"
                  />
                  <span className="text-sm">{category}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Gender Dropdown */}
      <div className="">
        <div className="">
          <button
            className="cursor-pointer w-full py-4  border-t inter border-gray-300 flex justify-between items-center"
            onClick={toggleGenderDropdown}
          >
            Gender
            <svg
              className={`w-5 h-5 mr-2 cursor-pointer transform transition-transform ${
                isGenderDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isGenderDropdownOpen && (
            <div className="bg-white   w-full pb-4 pt-0">
              {["Men", "Women", "Unisex"].map((gender) => (
                <label key={gender} className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    value={gender}
                    checked={genderFilter.includes(gender)}
                    onChange={handleGenderCheckboxChange}
                    className="appearance-none form-checkbox w-5 h-5 transition duration-300 ease-in-out cursor-pointer  bg-white border border-gray-400 rounded-md checked:bg-black checked:border-black focus:outline-none"
                  />
                  <span className="text-sm">{gender}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Price Dropdown */}
      <div className="">
        <button
          className="cursor-pointer w-full py-4 inter  border-t border-gray-300 flex justify-between items-center"
          onClick={togglePriceDropdown}
        >
          Price
          <svg
            className={`w-5 h-5  mr-2 cursor-pointer transform transition-transform ${
              isPriceDropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isPriceDropdownOpen && (
          <div className="bg-white   w-full pb-4 pt-0">
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={isUnder1000000}
                onChange={handlePriceCheckboxChange}
                className="appearance-none form-checkbox w-5 h-5 transition duration-300 ease-in-out cursor-pointer  bg-white border border-gray-400 rounded-md checked:bg-black checked:border-black focus:outline-none"
              />
              <span className="text-sm">
                Under 1,000,000<span className="text-sm underline">đ</span>
              </span>
            </label>
          </div>
        )}
      </div>
      {/* Brand Dropdown */}
      <div className="">
        <button
          className="cursor-pointer w-full py-4  border-t inter border-gray-300 flex justify-between items-center"
          onClick={toggleBrandDropdown}
        >
          Brand
          <svg
            className={`w-5 h-5  mr-2 cursor-pointer transform transition-transform ${
              isBrandDropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isBrandDropdownOpen && (
          <div className="bg-white   w-full pb-4 pt-0">
            {["Nike Sportswear", "Jordan", "NikeLab", "Nike"].map((brand) => (
              <label key={brand} className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  value={brand}
                  checked={brandFilter.includes(brand)}
                  onChange={handleBrandCheckboxChange}
                  className="appearance-none form-checkbox w-5 h-5 transition duration-300 ease-in-out cursor-pointer  bg-white border border-gray-400 rounded-md checked:bg-black checked:border-black focus:outline-none"
                />
                <span className="text-sm">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      {/* Color Dropdown */}
      <div className="">
        <button
          className="cursor-pointer w-full py-4  border-t inter border-gray-300 flex justify-between items-center"
          onClick={toggleColorDropdown}
        >
          Colour
          <svg
            className={`w-5 h-5  mr-2 cursor-pointer transform transition-transform ${
              isColorDropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isColorDropdownOpen && (
          <div className="bg-white w-full pb-4 pt-0 grid grid-cols-3 gap-2">
            {[
              "Purple",
              "Black",
              "Red",
              "Orange",
              "Blue",
              "White",
              "Brown",
              "Green",
              "Yellow",
              "Multi-Colour",
              "Grey",
              "Pink",
            ].map((mainColor) => {
              const isSelected = colorFilter.includes(mainColor);
              return (
                <div
                  key={mainColor}
                  className={` cursor-pointer text-center justify-center  transition-all duration-300`}
                  onClick={() => {
                    if (isSelected) {
                      setColorFilter([]);
                    } else {
                      setColorFilter([mainColor]);
                    }
                  }}
                >
                  <div
                    className={`w-7 h-7 justify-center mx-auto  rounded-full border-1  transition-all duration-300 ${
                      isSelected ? "border-black scale-110" : "border-gray-400"
                    }`}
                    style={{
                      background: getColorCode(mainColor),
                    }}
                  ></div>
                  <span className="text-xs">{mainColor}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* Technology Dropdown */}
      <div className="">
        <button
          className="cursor-pointer w-full py-4  border-t inter border-gray-300 flex justify-between items-center"
          onClick={toggleTechnologyDropdown}
        >
          Technology
          <svg
            className={`w-5 h-5  mr-2 cursor-pointer transform transition-transform ${
              isTechnologyDropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isTechnologyDropdownOpen && (
          <div className="bg-white   w-full pb-4 pt-0">
            {[
              "Nike ReactX",
              "Nike EasyOn",
              "Dri-FIT",
              "Dri-FIT ADV",
              "Nike Flyknit",
              "Nike Flywire",
              "GORE-TEX",
              "Nike Lunarlon",
              "Nike Max Air",
              "Nike Air",
              "Nike Free",
              "Nike React",
              "Nike Shox",
              "NikeSkin",
              "Nike Zoom Air",
              "Nike ZoomX",
            ].map((technology) => (
              <label key={technology} className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  value={technology}
                  checked={technologyFilter.includes(technology)}
                  onChange={handleTechnologyCheckboxChange}
                  className="appearance-none form-checkbox w-5 h-5 transition duration-300 ease-in-out cursor-pointer  bg-white border border-gray-400 rounded-md checked:bg-black checked:border-black focus:outline-none"
                />

                <span className="text-sm">{technology}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      {/* Features Dropdown */}
      <div className="">
        <button
          className="cursor-pointer w-full py-4  border-t inter border-gray-300 flex justify-between items-center"
          onClick={toggleFeaturesDropdown}
        >
          Features
          <svg
            className={`w-5 h-5  mr-2 cursor-pointer transform transition-transform ${
              isFeaturesDropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isFeaturesDropdownOpen && (
          <div className="bg-white   w-full pb-4 pt-0">
            {[
              "Side vents",
              "2-Way Zip",
              "4-way stretch",
              "2-way stretch",
              "Drawcord",
              "Flat Peak",
              "Front Zip",
              "Adjustable Hood",
              "Breathable",
              "Hooded",
              "Pockets",
              "Spikeless",
              "Water-resistant",
              "Waterproof",
              "Wide Waistband",
              "Zip Garage",
            ].map((features) => (
              <label key={features} className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  value={features}
                  checked={featuresFilter.includes(features)}
                  onChange={handleFeaturesCheckboxChange}
                  className="appearance-none form-checkbox w-5 h-5 transition duration-300 ease-in-out cursor-pointer  bg-white border border-gray-400 rounded-md checked:bg-black checked:border-black focus:outline-none"
                />
                <span className="text-sm">{features}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      {/* Status Dropdown */}
      <div className="">
        <button
          className="cursor-pointer w-full py-4  border-t inter border-gray-300 flex justify-between items-center"
          onClick={toggleStatusDropdown}
        >
          Status
          <svg
            className={`w-5 h-5  mr-2 cursor-pointer transform transition-transform ${
              isStatusDropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isStatusDropdownOpen && (
          <div className="bg-white   w-full pb-4 pt-0">
            {["Just In", "Coming Soon"].map((status) => (
              <label key={status} className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  value={status}
                  checked={statusFilter.includes(status)}
                  onChange={handleStatusCheckboxChange}
                  className="appearance-none form-checkbox w-5 h-5 transition duration-300 ease-in-out cursor-pointer  bg-white border border-gray-400 rounded-md checked:bg-black checked:border-black focus:outline-none"
                />
                <span className="text-sm">{status}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      {/* Height Dropdown */}
      <div className="">
        <button
          className="cursor-pointer w-full py-4  border-t inter border-gray-300 flex justify-between items-center"
          onClick={toggleHeightDropdown}
        >
          Shoe Height
          <svg
            className={`w-5 h-5  mr-2 cursor-pointer transform transition-transform ${
              isHeightDropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {isHeightDropdownOpen && (
          <div className="bg-white   w-full pb-4 pt-0">
            {["Low Top", "High Top", "Mid Top"].map((height) => (
              <label key={height} className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  value={height}
                  checked={heightFilter.includes(height)}
                  onChange={handleHeightCheckboxChange}
                  className="appearance-none form-checkbox w-5 h-5 transition duration-300 ease-in-out cursor-pointer  bg-white border border-gray-400 rounded-md checked:bg-black checked:border-black focus:outline-none"
                />
                <span className="text-sm">{height}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarFilter;
