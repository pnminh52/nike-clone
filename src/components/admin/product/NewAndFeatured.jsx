import React from 'react'

const NewAndFeatured = ({value, onChange}) => {
    const options = [
        "New & Upcoming Drops",
        "New Arrivals",
        "Bestsellers",
        "Member Exclusive",
        "Customise with Nike By You",
        "What's Trending",
        "Jordan",
        "Air Max Dn8",
        "Nike 24.7",
        "Retro Running",
        "Running Shoe Finder",
        "Lifestyle",
        "Air Force 1",
        "Air Jordan 1",
        "Air Max",
        "Dunk",
        "Cortez",
        "Blazer",
        "Pegasus",
        "Vomero",
        "Running",
        "Basketball",
        "Football",
        "Golf",
        "Tennis",
        "Gym and Training",
        "Yoga",
        "Skateboarding",
      ];
    
      return (
        <select
          name="category"
          value={value || ""}
          onChange={onChange}
          className="w-full border rounded p-2"
        >
          <option value="">Select Category</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    };

export default NewAndFeatured
