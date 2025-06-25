import React from "react";

const ResultNotfound = () => {
  return (
    <div className="h-100 flex items-center mx-auto justify-center">
      <div className="text-center">
        <p className="text-lg">No results found.</p>
        <p className=" text-blue-600 underline text-sm">
          Try searching for something else.
        </p>
      </div>
    </div>
  );
};

export default ResultNotfound;
