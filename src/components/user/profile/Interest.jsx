import React, { useState } from "react";

const tabs = ["All", "Sports", "Products", "Teams", "Athlete", "Cities"];

const Interest = () => {
  const [selected, setSelected] = useState("All");

  const title = selected === "All" ? "Interest" : selected;

  return (
    <div>
      <div className="flex justify-between items-center py-6">
        <p className="text-2xl">Interests</p>
        <p className="inter cursor-pointer">Edit</p>
      </div>

      <div className="flex overflow-auto hide-scrollbar border-b border-gray-400">
        {tabs.map((tab) => (
          <p
            key={tab}
            onClick={() => setSelected(tab)}
            className={`inter text-lg px-3 py-3 cursor-pointer ${selected === tab ? "border-b-2 border-black" : ""
              }`}
          >
            {tab}
          </p>
        ))}
      </div>

      <p className="inter mt-4">
        Add your interests to shop a collection of products that are based on
        what you're into.
      </p>

      <div className="py-8">
        <div className="w-50 h-50 relative bg-[#F5F5F5] cursor-pointer">
          <div
            className="absolute cursor-pointer top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 24 24"
              role="img"
              width="28px"
              height="28px"
              className="flex text-center justify-center w-full"
              fill="none"
            >
              <path
                stroke="currentColor"
                strokeWidth="1.5"
                d="M12 6v12m6-6H6m15.75 0c0 5.39-4.36 9.75-9.75 9.75S2.25 17.39 2.25 12 6.61 2.25 12 2.25s9.75 4.36 9.75 9.75z"
              ></path>
            </svg>
            <p className="mt-1 text-lg inter text-gray-700 whitespace-nowrap">
              Add {title}
            </p>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Interest;
