import React, { useState } from 'react';

const CategoryTopBar = ({ categoryName, filteredProductsLength }) => {
    const [sortByFilter, setSortByFilter] = useState(false);

    const toggleSortByFilter = () => {
        setSortByFilter(!sortByFilter);
    };

    return (
        <div  className="flex justify-between items-center h-18 sticky top-0 bg-white z-10">
            <p className="text-xl">{categoryName} ({filteredProductsLength})</p>
            <div className="cursor-pointer flex items-center gap-2" onClick={toggleSortByFilter}>
                <p>Sort By</p>
                <svg
                    className={`w-5 h-5 cursor-pointer transform transition-transform ${sortByFilter ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                {sortByFilter && (
                <div className="absolute top-12 right-0 bg-white w-auto z-20 px-6 py-4 rounded-bl-3xl">
                    <p className="mb-1 cursor-pointer hover:text-gray-400 text-right">Featured</p>
                    <p className="mb-1 cursor-pointer hover:text-gray-400 text-right">Newest</p>
                    <p className="mb-1 cursor-pointer hover:text-gray-400">Price: Low-High</p>
                    <p className="mb-1 cursor-pointer hover:text-gray-400">Price: High-Low</p>

                </div>
            )}
            </div>

            
        </div>
    );
};

export default CategoryTopBar;
