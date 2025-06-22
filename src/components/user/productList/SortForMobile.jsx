import React, { useState, useEffect } from "react";

const SortForMobile = ({
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
  const [isOpen, setIsOpen] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  const closeMenu = () => {
    setAnimateOut(true);
  };
  const handleGenderCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setGenderFilter([value]);
      closeMenu(); // đóng popup sau khi chọn
    } else {
      setGenderFilter([]);
    }
  };

  const handleBrandCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setBrandFilter([value]);
      closeMenu();
    } else {
      setBrandFilter([]);
    }
  };
  const handlePriceCheckboxChange = (e) => {
    setIsUnder1000000(e.target.checked);
    closeMenu();
  };

  const handleCategoryCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setForFilter([value]);
      closeMenu();
    } else {
      setForFilter([]);
    }
  };

  const handleTechnologyCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setTechnologyFilter([value]);
      closeMenu();
    } else {
      setTechnologyFilter([]);
    }
  };

  const handleFeaturesCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setFeaturesFilter([value]);
      closeMenu();
    } else {
      setFeaturesFilter([]);
    }
  };

  const handleStatusCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setStatusFilter([value]);
      closeMenu();
    } else {
      setStatusFilter([]);
    }
  };

  const handleHeightCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setHeightFilter([value]);
      closeMenu();
    } else {
      setHeightFilter([]);
    }
  };

  const handleColorClick = (mainColor) => {
    if (colorFilter.includes(mainColor)) {
      setColorFilter([]);
    } else {
      setColorFilter([mainColor]);
      closeMenu();
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
  useEffect(() => {
    if (animateOut) {
      const timer = setTimeout(() => {
        setIsOpen(false);
        setAnimateOut(false);
      }, 300); // thời gian animation
      return () => clearTimeout(timer);
    }
  }, [animateOut]);

  return (
    <>
      <div
        className="flex gap-1 items-center px-4 py-1 border rounded-full border-gray-300 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <p>Filters</p>
        <svg
          aria-hidden="true"
          className="icon-filter-ds"
          focusable="false"
          viewBox="0 0 24 24"
          role="img"
          width="24px"
          height="24px"
          fill="none"
        >
          <path
            stroke="currentColor"
            strokeWidth="1.5"
            d="M21 8.25H10m-5.25 0H3"
          ></path>
          <path
            stroke="currentColor"
            strokeWidth="1.5"
            d="M7.5 6v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
            clipRule="evenodd"
          ></path>
          <path
            stroke="currentColor"
            strokeWidth="1.5"
            d="M3 15.75h10.75m5 0H21"
          ></path>
          <path
            stroke="currentColor"
            strokeWidth="1.5"
            d="M16.5 13.5v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>

      {isOpen && (
        <div
          className={`fixed inset-0 bg-white z-50  ${
            animateOut ? "slide-down" : "slide-up"
          }`}
        >
          <div className="absolute top-4 right-4">
            <button
              onClick={closeMenu}
              type="button"
              className="w-8 h-8 cursor-pointer bg-gray-200 rounded-full flex items-center justify-center"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 17L16.8995 7.10051"
                  stroke="#000000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 7.00001L16.8995 16.8995"
                  stroke="#000000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
         <div className="px-6 py-4">

          <div className="  max-h-[100vh] overflow-auto">
            <div className="bg-white  w-full ">
              <p className="text-lg py-2 ">Gender</p>
              <div className="border border-blue-600">
                {["Men", "Women", "Unisex"].map((gender) => (
                  <label
                    key={gender}
                    className=" flex items-center gap-2 py-1 space-y-0"
                  >
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
            </div>
            <div className="bg-white w-full ">
              <p className="text-lg py-2">Category</p>

              <div className="border border-blue-600">
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
                    className=" flex items-center gap-2 py-1 space-y-0"
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
            </div>
            <div className="bg-white   w-full ">
              <p className="text-lg py-2">Price</p>
              <label className="flex items-center py-1 gap-2 border border-blue-600">
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
            <div className="bg-white   w-full">
              <p className="text-lg py-2">Brand</p>

              <div className="border border-blue-600">
                {["Nike Sportswear", "Jordan", "NikeLab", "Nike"].map(
                  (brand) => (
                    <label
                      key={brand}
                      className="flex items-center gap-2   py-1 space-y-0 "
                    >
                      <input
                        type="checkbox"
                        value={brand}
                        checked={brandFilter.includes(brand)}
                        onChange={handleBrandCheckboxChange}
                        className="appearance-none form-checkbox w-5 h-5 transition duration-300 ease-in-out cursor-pointer  bg-white border border-gray-400 rounded-md checked:bg-black checked:border-black focus:outline-none"
                      />
                      <span className="text-sm">{brand}</span>
                    </label>
                  )
                )}
              </div>
            </div>
            <div className="bg-white w-full   ">
              <p className="text-lg py-2">Color</p>

              <div className="border border-blue-600 grid grid-cols-3 gap-2 py-1">
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
                      onClick={() => handleColorClick(mainColor)}
                    >
                      <div
                        className={`w-7 h-7 justify-center mx-auto  rounded-full border-1  transition-all duration-300 ${
                          isSelected
                            ? "border-black scale-110"
                            : "border-gray-200"
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
            </div>
            <div className="bg-white   w-full ">
              <p className="text-lg py-2">Technology</p>

              <div className="border border-blue-600 py-1 space-y-0">
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
                  <label
                    key={technology}
                    className="flex items-center gap-2 space-y-0 py-1"
                  >
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
            </div>
            <div className="bg-white   w-full">
              <p className="text-lg py-2">Featured</p>

              <div className="border border-blue-600">
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
                  <label
                    key={features}
                    className="flex items-center gap-2 py-1 space-y-0"
                  >
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
            </div>
            <div className="bg-white   w-full ">
              <p className="text-lg py-2">Status</p>

              <div className="border border-blue-600">
                {["Just In", "Coming Soon"].map((status) => (
                  <label
                    key={status}
                    className="flex items-center gap-2 space-y-0 py-1"
                  >
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
            </div>
            <div className="bg-white   w-full ">
              <p className="text-lg py-2">Height</p>

              <div className="border border-blue-600">
                {["Low Top", "High Top", "Mid Top"].map((height) => (
                  <label
                    key={height}
                    className="flex items-center gap-2 py-1 space-y-0"
                  >
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
            </div>
          </div>
         </div>
        </div>
      )}
    </>
  );
};

export default SortForMobile;
