import React, { useState } from 'react';
import SortForMobile from './SortForMobile';
import ResultNotfound from '../etc/ResultNotfound';

const CategoryTopBar = ({
  sortType,
  setSortType,
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
  category,
  categoryName,
  filteredProductsLength,
  onSortChange
}) => {
    const [sortByFilter, setSortByFilter] = useState(false);

    const toggleSortByFilter = () => {
        setSortByFilter(!sortByFilter);
    };
    const handleSortChange = (sortType) => {
        onSortChange(sortType);
        setSortByFilter(false);
    }
    return (
       <div>
         <div className='hidden sm:block'>
        <div className="flex justify-between items-center h-18 sticky top-0 bg-white z-10">
          
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
                    <div className="absolute top-12 right-0 shadow-lg bg-white w-auto z-20 px-6 pb-4 pt-1.5 rounded-tr-none rounded-bl-3xl">
                        <p
                            className="mb-1 cursor-pointer hover:text-gray-400 text-right"
                            onClick={() => handleSortChange('featured')}
                        >
                            Featured
                        </p>
                        <p
                            className="mb-1 cursor-pointer hover:text-gray-400 text-right"
                            onClick={() => handleSortChange('newest')}
                        >
                            Newest
                        </p>
                        <p
                            className="mb-1 cursor-pointer hover:text-gray-400 text-right"
                            onClick={() => handleSortChange('priceLowHigh')}
                        >
                            Price: Low-High
                        </p>
                        <p
                            className="mb-1 cursor-pointer hover:text-gray-400 text-right"
                            onClick={() => handleSortChange('priceHighLow')}
                        >
                            Price: High-Low
                        </p>


                    </div>
                )}
          
          </div>


        </div>
        </div>
        <div className='block sm:hidden'>
        <div className="px-6 sm:px-0 py-5">
  <h2 className="text-lg ">{categoryName}{forFilter.length > 0 ? ` / ${forFilter[0]}` : ''}</h2>
  <p className="text-sm text-blue-600 underline">The list of products is shown below</p>
</div>
           
            <div className="bg-white flex px-6  py-4 space-x-4 border-b border-t border-gray-300 hide-scrollbar whitespace-nowrap overflow-auto">
  {[
    'Lifestyle',
    'Jordan',
    'Running',
    'Basketball',
    'Training',
    'Football',
    'Skateboarding',
    'Golf',
    'Boots',
    'Tennis',
    'Athletics',
    'Sandals',
  ].map((category) => (
    <label
      key={category}
      className={`flex text-[#707072] items-center transition duration-300 ease-in-out  inter cursor-pointer ${forFilter.includes(category) ? 'text-black' : ''}`}
      onClick={() => {
        if (forFilter.includes(category)) {
          setForFilter([]);
        } else {
          setForFilter([category]); 
        }
      }}
      

    >
      <span>{category}</span>
    </label>
  ))}
</div>
<div className='h-16  rounded-lg items-center flex px-6 justify-between'>

<p className="text-lg text-[#707072]"> {filteredProductsLength} Results</p>


<SortForMobile
 sortType={sortType}
 setSortType={setSortType}
  forFilter={forFilter}
  setForFilter={setForFilter}
  heightFilter={heightFilter}
  setHeightFilter={setHeightFilter}
  statusFilter={statusFilter}
  setStatusFilter={setStatusFilter}
  colorFilter={colorFilter}
  setColorFilter={setColorFilter}
  featuresFilter={featuresFilter}
  setFeaturesFilter={setFeaturesFilter}
  technologyFilter={technologyFilter}
  setTechnologyFilter={setTechnologyFilter}
  brandFilter={brandFilter}
  setBrandFilter={setBrandFilter}
  genderFilter={genderFilter}
  setGenderFilter={setGenderFilter}
  isUnder1000000={isUnder1000000}
  setIsUnder1000000={setIsUnder1000000}
  category={category}
  categoryName={categoryName}
  filteredProductsLength={filteredProductsLength}
  onSortChange={onSortChange}
/>



</div>
        </div>
        {filteredProductsLength === 0 && (
  <div className="px-6 py-10">
    <ResultNotfound />
  </div>
)}
       </div>
    );
};

export default CategoryTopBar;