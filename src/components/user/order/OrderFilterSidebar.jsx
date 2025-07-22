// components/OrderFilterSidebar.jsx
import React, { useState } from "react";

const OrderFilterSidebar = ({
  priceSort,
  setPriceSort,
  statusFilters,
  setStatusFilters,
  itemSort,
  setItemSort,
  dateSort,
  setDateSort,
  dateRange,
  setDateRange,
}) => {
    const [ddPrice, setddPrice]=useState(false)
    const [ddStatus, setddStatus]=useState(false)
    const [ddItemSort, setDdItemSort] = useState(false);
const [ddDateSort, setDdDateSort] = useState(false);
const [ddDateRange, setDdDateRange] = useState(false);

const toggleDdItemSort = () => setDdItemSort(!ddItemSort);
const toggleDdDateSort = () => setDdDateSort(!ddDateSort);
const toggleDdDateRange = () => setDdDateRange(!ddDateRange);
    const toggleDdPriceOpen=()=>{
        setddPrice(!ddPrice)
    }
    const toggleDdStatusOpen=()=>{
        setddStatus(!ddStatus)
    }
  return (
    <div className="w-[20%] ">
         <div className="">
  <button
    className="cursor-pointer w-full py-4 border-t inter border-gray-300 flex justify-between items-center"
    onClick={toggleDdPriceOpen}
  >
    Sort by Price
    <svg
      className={`w-5 h-5 mr-2 transform transition-transform ${
        ddPrice ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  {ddPrice && (
    <div className="bg-white mb-2 space-y-2 text-sm">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          name="priceSort"
          className="appearance-none form-checkbox w-5 h-5 transition duration-300 ease-in-out cursor-pointer  bg-white border border-gray-400 rounded-md checked:bg-black checked:border-black focus:outline-none"

          value="asc"
          checked={priceSort === "asc"}
          onChange={(e) => setPriceSort(e.target.value)}
        />
        Low to High
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          name="priceSort"
          value="desc"
          checked={priceSort === "desc"}         
           className="appearance-none form-checkbox w-5 h-5 transition duration-300 ease-in-out cursor-pointer  bg-white border border-gray-400 rounded-md checked:bg-black checked:border-black focus:outline-none"

          onChange={(e) => setPriceSort(e.target.value)}
        />
        High to Low
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          name="priceSort"
          value=""
          className="appearance-none form-checkbox w-5 h-5 transition duration-300 ease-in-out cursor-pointer  bg-white border border-gray-400 rounded-md checked:bg-black checked:border-black focus:outline-none"

          checked={priceSort === ""}
          onChange={(e) => setPriceSort(e.target.value)}
        />
        All
      </label>
    </div>
  )}
</div>

<div className="">
  <button
    className="cursor-pointer w-full py-4 border-t inter border-gray-300 flex justify-between items-center"
    onClick={toggleDdStatusOpen}
  >
    Sort by Status
    <svg
      className={`w-5 h-5 mr-2 transform transition-transform ${
        ddStatus ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  {ddStatus && (
    <div className="bg-white  py-2 space-y-2 text-sm">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="statusFilter"
          className="appearance-none form-checkbox w-5 h-5 transition duration-300 ease-in-out cursor-pointer  bg-white border border-gray-400 rounded-md checked:bg-black checked:border-black focus:outline-none"

          value=""
          checked={statusFilters.length === 0}
          onChange={() => setStatusFilters([])}
        />
        All
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="statusFilter"
          className="appearance-none form-checkbox w-5 h-5 transition duration-300 ease-in-out cursor-pointer  bg-white border border-gray-400 rounded-md checked:bg-black checked:border-black focus:outline-none"

          value="Pending"
          checked={statusFilters[0] === "Pending"}
          onChange={() => setStatusFilters(["Pending"])}
        />
        Pending
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"          
          className="appearance-none form-checkbox w-5 h-5 transition duration-300 ease-in-out cursor-pointer  bg-white border border-gray-400 rounded-md checked:bg-black checked:border-black focus:outline-none"

          name="statusFilter"
          value="Confirmed"
          checked={statusFilters[0] === "Confirmed"}
          onChange={() => setStatusFilters(["Confirmed"])}
        />
        Confirmed
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"          
          className="appearance-none form-checkbox w-5 h-5 transition duration-300 ease-in-out cursor-pointer  bg-white border border-gray-400 rounded-md checked:bg-black checked:border-black focus:outline-none"

          name="statusFilter"
          value="Processing"
          checked={statusFilters[0] === "Processing"}
          onChange={() => setStatusFilters(["Processing"])}
        />
        Processing
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"          
          className="appearance-none form-checkbox w-5 h-5 transition duration-300 ease-in-out cursor-pointer  bg-white border border-gray-400 rounded-md checked:bg-black checked:border-black focus:outline-none"

          name="statusFilter"
          value="Shipping"
          checked={statusFilters[0] === "Shipping"}
          onChange={() => setStatusFilters(["Shipping"])}
        />
        Shipping
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"          
          className="appearance-none form-checkbox w-5 h-5 transition duration-300 ease-in-out cursor-pointer  bg-white border border-gray-400 rounded-md checked:bg-black checked:border-black focus:outline-none"

          name="statusFilter"
          value="Delivered"
          checked={statusFilters[0] === "Delivered"}
          onChange={() => setStatusFilters(["Delivered"])}
        />
        Delivered
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"          
          className="appearance-none form-checkbox w-5 h-5 transition duration-300 ease-in-out cursor-pointer  bg-white border border-gray-400 rounded-md checked:bg-black checked:border-black focus:outline-none"

          name="statusFilter"
          value="Cancelled"
          checked={statusFilters[0] === "Cancelled"}
          onChange={() => setStatusFilters(["Cancelled"])}
        />
        Cancelled
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"          
          className="appearance-none form-checkbox w-5 h-5 transition duration-300 ease-in-out cursor-pointer  bg-white border border-gray-400 rounded-md checked:bg-black checked:border-black focus:outline-none"

          name="statusFilter"
          value="Returned"
          checked={statusFilters[0] === "Returned"}
          onChange={() => setStatusFilters(["Returned"])}
        />
        Returned
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"          
          className="appearance-none form-checkbox w-5 h-5 transition duration-300 ease-in-out cursor-pointer  bg-white border border-gray-400 rounded-md checked:bg-black checked:border-black focus:outline-none"

          name="statusFilter"
          value="Refunded"
          checked={statusFilters[0] === "Refunded"}
          onChange={() => setStatusFilters(["Refunded"])}
        />
        Refunded
      </label>

    </div>
  )}
</div>


     

<div className="">
  <button
    className="cursor-pointer w-full py-4 border-t inter border-gray-300 flex justify-between items-center"
    onClick={toggleDdItemSort}
  >
    Sort by Items
    <svg
      className={`w-5 h-5 mr-2 transform transition-transform ${
        ddItemSort ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  {ddItemSort && (
    <div className="bg-white py-2 space-y-2 text-sm">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="itemSort"
                    className="appearance-none form-checkbox w-5 h-5 transition duration-300 ease-in-out cursor-pointer  bg-white border border-gray-400 rounded-md checked:bg-black checked:border-black focus:outline-none"

          value=""
          checked={itemSort === ""}
          onChange={() => setItemSort("")}
        />
        All
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="itemSort"
                    className="appearance-none form-checkbox w-5 h-5 transition duration-300 ease-in-out cursor-pointer  bg-white border border-gray-400 rounded-md checked:bg-black checked:border-black focus:outline-none"

          value="asc"
          checked={itemSort === "asc"}
          onChange={() => setItemSort("asc")}
        />
        Low to High
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="itemSort"
                    className="appearance-none form-checkbox w-5 h-5 transition duration-300 ease-in-out cursor-pointer  bg-white border border-gray-400 rounded-md checked:bg-black checked:border-black focus:outline-none"

          value="desc"
          checked={itemSort === "desc"}
          onChange={() => setItemSort("desc")}
        />
        High to Low
      </label>
    </div>
  )}
</div>


<div className="">
  <button
    className="cursor-pointer w-full py-4 border-t inter border-gray-300 flex justify-between items-center"
    onClick={toggleDdDateSort}
  >
    Sort by Date
    <svg
      className={`w-5 h-5 mr-2 transform transition-transform ${
        ddDateSort ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  {ddDateSort && (
    <div className="bg-white  py-2 space-y-2 text-sm">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="dateSort"
                    className="appearance-none form-checkbox w-5 h-5 transition duration-300 ease-in-out cursor-pointer  bg-white border border-gray-400 rounded-md checked:bg-black checked:border-black focus:outline-none"

          value=""
          checked={dateSort === ""}
          onChange={() => setDateSort("")}
        />
        None
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="dateSort"
                    className="appearance-none form-checkbox w-5 h-5 transition duration-300 ease-in-out cursor-pointer  bg-white border border-gray-400 rounded-md checked:bg-black checked:border-black focus:outline-none"

          value="newest"
          checked={dateSort === "newest"}
          onChange={() => setDateSort("newest")}
        />
        Newest First
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="dateSort"
                    className="appearance-none form-checkbox w-5 h-5 transition duration-300 ease-in-out cursor-pointer  bg-white border border-gray-400 rounded-md checked:bg-black checked:border-black focus:outline-none"

          value="oldest"
          checked={dateSort === "oldest"}
          onChange={() => setDateSort("oldest")}
        />
        Oldest First
      </label>
    </div>
  )}
</div>


<div className="">
  <button
    className="cursor-pointer w-full py-4 border-t inter border-gray-300 flex justify-between items-center"
    onClick={toggleDdDateRange}
  >
    Sort by Days
    <svg
      className={`w-5 h-5 mr-2 transform transition-transform ${
        ddDateRange ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  {ddDateRange && (
    <div className="bg-white  py-2 space-y-2 text-sm">
      {["", "7", "15", "30", "60"].map((value) => (
        <label
          key={value}
          className="flex items-center gap-2 cursor-pointer"
        >
          <input
            type="radio"
            name="dateRange"
            className="appearance-none form-checkbox w-5 h-5 transition duration-300 ease-in-out cursor-pointer  bg-white border border-gray-400 rounded-md checked:bg-black checked:border-black focus:outline-none"

            value={value}
            checked={dateRange === value}
            onChange={() => setDateRange(value)}
          />
          {value === ""
            ? "All Time"
            : `Last ${value} days`}
        </label>
      ))}
    </div>
  )}
</div>

    </div>
  );
};

export default OrderFilterSidebar;
