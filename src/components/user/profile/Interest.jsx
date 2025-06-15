import React, { useState } from "react";
import AddInterestPopup from "./AddInterestPopup";
const tabs = ["All", "Sports", "Products", "Teams", "Athlete", "Cities"];
import { useAuth } from "../../../hooks/useAuth";

const Interest = () => {
  const { user } = useAuth();
  const [selected, setSelected] = useState("All");
  const [showPopup, setShowPopup] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const handleShowAll = () => {
    setShowAll((prev) => !prev);
  };
  const handleClick = () => {
    setShowPopup(true);
  };

  const title = selected === "All" ? "Interest" : selected;

  return (
    <div className="block sm:hidden">
      <div className="flex justify-between items-center py-6">
        <p className="text-2xl">Interests</p>
        <p className="inter cursor-pointer">Edit</p>
      </div>

      <div className="flex overflow-auto hide-scrollbar border-b border-gray-400">
        {tabs.map((tab) => (
          <p
            key={tab}
            onClick={() => {setSelected(tab),
              setShowAll(false);
            }}
            className={`inter text-lg px-3 py-3 cursor-pointer ${
              selected === tab ? "border-b-2 border-black" : ""
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

      {!showAll ? (
        <div className="py-8  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div
            onClick={handleClick}
            className="aspect-square relative bg-[#F5F5F5] cursor-pointer flex items-center justify-center"
          >
            <div className="text-center">
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 24 24"
                role="img"
                width="28px"
                height="28px"
                className="mx-auto"
                fill="none"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="1.5"
                  d="M12 6v12m6-6H6m15.75 0c0 5.39-4.36 9.75-9.75 9.75S2.25 17.39 2.25 12 6.61 2.25 12 2.25s9.75 4.36 9.75 9.75z"
                ></path>
              </svg>
              <p className="mt-1  inter text-gray-700 whitespace-nowrap">
                Add {title}
              </p>
            </div>
          </div>

          {user?.interest
            ?.filter((item) => selected === "All" || item.category === selected)
            .slice(0, 3)
            .map((item) => (
              <div
                key={item.id}
                className="relative aspect-square  overflow-hidden"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full cursor-pointer object-cover"
                />
                <div className="absolute inset-0 bg-black/40 hover:bg-black/50"></div>
                <p className="absolute bottom-4 left-4  text-white  inter">
                  {item.name}
                </p>
              </div>
            ))}
        </div>
      ) : (
        <div className=" py-8">
          <div className="flex border-b border-gray-400 gap-4 p-4 items-center">
            <div
              onClick={handleClick}
              className="aspect-square  bg-[#F5F5F5] cursor-pointer flex items-center justify-center"
            >
              <div className="text-center w-18 h-18 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    viewBox="0 0 24 24"
                    role="img"
                    width="28px"
                    height="28px"
                    fill="none"
                  >
                    <path
                      stroke="currentColor"
                      strokeWidth="1.5"
                      d="M12 6v12m6-6H6m15.75 0c0 5.39-4.36 9.75-9.75 9.75S2.25 17.39 2.25 12 6.61 2.25 12 2.25s9.75 4.36 9.75 9.75z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <p className="inter">Add {title}</p>
          </div>
          {user?.interest
  ?.filter((item) => selected === "All" || item.category === selected)
  .map((item, index, arr) => (
    <div
      key={item.id}
      className={`p-4 flex justify-between items-center ${index !== arr.length - 1 ? "border-b border-gray-400" : ""}`}
    >
      <div className="flex gap-4 items-center">
        <img src={item.img} alt={item.name} className="w-18 h-18 object-cover" />
        <p className="inter">{item.name}</p>
      </div>
    </div>
))}


        </div>
      )}
      {
  user?.interest.filter((item) => selected === "All" || item.category === selected).length > 3 && (
    <button
      onClick={handleShowAll}
      className="block cursor-pointer w-full inter mb-8 text-lg rounded-full h-16 transition bg-white text-black border border-gray-400 hover:border-black text-center leading-[4rem]"
    >
      {showAll ? "Show Less" : "Show All"}
    </button>
  )
}


      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white  rounded-lg w-full h-full">
            <AddInterestPopup
              title={title}
              onClose={() => setShowPopup(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Interest;
