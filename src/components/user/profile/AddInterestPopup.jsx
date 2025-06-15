import React, { useState, useEffect } from "react";
import useInterest from "../../../hooks/useInterest";
const categories = ["All", "Sports", "Products", "Teams", "Athlete", "Cities"];

const AddInterestPopup = ({ title, onClose }) => {
  const { interests, saveUserInterests } = useInterest();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedItems, setSelectedItems] = useState([]);

  // 🟡 Lấy interest có sẵn từ user và pre-fill
  useEffect(() => {
    if (!interests.length) return;
    const stored = JSON.parse(localStorage.getItem("user")); // hoặc lấy từ context nếu cần
    if (stored?.interest) {
      const ids = stored.interest.map((i) => i.id);
      setSelectedItems(ids);
    }
  }, [interests]);

  const handleToggle = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    await saveUserInterests(new Set(selectedItems));
    onClose();
  };

  const filteredInterests =
    selectedCategory === "All"
      ? interests
      : interests.filter((item) => item.category === selectedCategory);

  const getSelectedCount = (cat) => {
    if (cat === "All") return selectedItems.length;
    return interests.filter((item) => item.category === cat && selectedItems.includes(item.id)).length;
  };

  return (
    <div className="py-10">
      {/* Header */}
      <div className="flex justify-between items-center px-6">
        <p className="text-2xl">Select your interests</p>
        <svg
          className="cursor-pointer"
          onClick={onClose}
          viewBox="0 0 24 24"
          fill="none"
          width="35px"
          height="35px"
        >
          <path d="M7 17L16.8995 7.10051" stroke="#000" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 7.00001L16.8995 16.8995" stroke="#000" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Tabs */}
      <div className="flex overflow-auto hide-scrollbar px-6 border-b border-gray-400 gap-2">
        {categories.map((cat) => {
          const count = getSelectedCount(cat);
          return (
            <p
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`inter text-lg px-4 py-4 cursor-pointer whitespace-nowrap ${
                selectedCategory === cat ? "border-b-2 border-black" : " text-gray-400"
              }`}
            >
              {cat}
              {count > 0 && <span> ({count})</span>}
            </p>
          );
        })}
      </div>

      {/* List */}
      <div className="max-h-[350px] overflow-auto">
        {filteredInterests.map((item) => (
          <div key={item.id} className="border-b p-4 flex justify-between items-center border-gray-400">
            <div className="flex gap-2 items-center">
              <img src={item.img} alt={item.name} className="w-18 h-18 object-cover" />
              <p className="inter text-sm">{item.name}</p>
            </div>
            <input
              type="checkbox"
              checked={selectedItems.includes(item.id)}
              onChange={() => handleToggle(item.id)}
              className="appearance-none transition duration-300 ease-in-out cursor-pointer w-6 h-6 bg-white border-2 border-gray-400 rounded-md checked:bg-black checked:border-black focus:outline-none"
            />
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-2 items-center justify-center py-8">
        <button onClick={onClose} className="inter px-4 py-2 border border-gray-400 rounded-full">
          Cancel
        </button>
        <button onClick={handleSave} className="inter px-4 py-2 text-white bg-black rounded-full">
          Save
        </button>
      </div>
    </div>
  );
};

export default AddInterestPopup;
