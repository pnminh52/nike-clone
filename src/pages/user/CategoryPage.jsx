import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ShoesCard from '../../components/user/ShoesCard';
import { Link } from 'react-router-dom';

const CategoryPage = () => {
  const { name } = useParams(); // Getting the category name from URL
  const [products, setProducts] = useState([]); // State to store products
  const [categories, setCategories] = useState([]); // State to store categories
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFilterVisible, setIsFilterVisible] = useState(true); // State to control filter visibility
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading status
  const [genderFilter, setGenderFilter] = useState([]);
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
  
  const [minPrice, setMinPrice] = useState(1000000); // State for min price
  const [maxPrice, setMaxPrice] = useState(7000000); // State for max price
  const [isUnder1000000, setIsUnder1000000] = useState(false); // State for "Under 1,000,000" checkbox

  // Fetch categories and products based on category
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch categories
        const categoriesResponse = await fetch(`http://localhost:3000/categories`);
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        // Fetch products
        const productsResponse = await fetch(`http://localhost:3000/products`);
        const productsData = await productsResponse.json();

        // Find category name and parentId
        const category = categoriesData.find(cat => cat.name === decodeURIComponent(name));
        setSelectedCategory(category);
        if (category) {
          // Filter products based on category name
          const filteredProducts = productsData.filter(
            (product) => product.category === category.name
          );

          // Group products by name, price, gender (but no status)
          const groupedProducts = filteredProducts.reduce((acc, product) => {
            const key = `${product.name}-${product.price}-${product.price_sale}-${product.gender}`;
            
            if (!acc[key]) {
              acc[key] = { ...product, variants: [] };
            }

            if (product.position === 1) {
              acc[key].mainImage = product.img; // Set the main image from position 1
            }

            acc[key].variants.push(product); // Add variant to the group
            return acc;
          }, {});

          setProducts(Object.values(groupedProducts)); // Set grouped products to state
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name]); // Dependency on category name to refetch when it changes

  const handleGenderCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setGenderFilter([value]); // chỉ giữ một giá trị
    } else {
      setGenderFilter([]); // bỏ chọn nếu bấm lại
    }
  };
  
  

  // Filter products by price range
  const handleMinPriceChange = (e) => {
    setMinPrice(Number(e.target.value));
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(Number(e.target.value));
  };

  // Handle the "Under 1,000,000" checkbox
  const handleUnder1000000Change = (e) => {
    setIsUnder1000000(e.target.checked);
    if (e.target.checked) {
      setMinPrice(0);
      setMaxPrice(1000000);
    } else {
      setMinPrice(1000000);
      setMaxPrice(7000000);
    }
  };

  const filteredProducts = products
    .filter((product) => {
      // Filter by gender
      if (genderFilter.length > 0 && !product.variants.some((variant) => genderFilter.includes(variant.gender))) {
        return false;
      }
      // Filter by price range
      const minPriceProduct = Math.min(...product.variants.map((variant) => variant.price));
      const maxPriceProduct = Math.max(...product.variants.map((variant) => variant.price));
      if (minPriceProduct < minPrice || maxPriceProduct > maxPrice) {
        return false;
      }
      return true;
    });

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 14); // Adjust the threshold as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="h-900 max-w-screen-2xl px-10 mx-auto">
      <div className="flex justify-between items-center h-18 sticky top-0 bg-white z-10">
        <p
          className={`inter transition-all duration-300 ${isScrolled ? "text-lg" : "text-2xl"}`}
        >
          {decodeURIComponent(name || "")} ({filteredProducts.length})
        </p>
        <div className="flex items-center gap-6">
          {/* <p className="cursor-pointer flex gap-1 items-center" onClick={() => setIsFilterVisible(!isFilterVisible)}>
            {isFilterVisible ? 'Hide Filters' : 'Show Filters'}
          </p> */}
          <p className="flex gap-1 items-center">Sort By</p>
        </div>
      </div>

      <div className="flex gap-2">
        {/* Sidebar */}
        <div className={`transition-all duration-300 ${isFilterVisible ? 'w-1/5 opacity-100' : 'w-0 opacity-0 overflow-hidden'}`}>
          {/* Gender Filter */}
          {/* Gender Filter (Dropdown Checkbox) */}
<div className="mb-4 ">
  <div
    type="button"
    className="w-full border-t border-b border-gray-400    "
  >
   <div className='flex items-center justify-between py-4'>
   <span className='text-lg'     onClick={() => setIsGenderDropdownOpen(!isGenderDropdownOpen)}
   >Gender</span>
    <svg
        onClick={() => setIsGenderDropdownOpen(!isGenderDropdownOpen)}

      className={`w-5 h-5 cursor-pointer transform transition-transform ${isGenderDropdownOpen ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
   </div>
    {isGenderDropdownOpen && (
    <div className="  w-full bg-white  mb-4 ">
      {['Men', 'Women', 'Unisex'].map((gender) => (
        <label key={gender} className="flex items-center text-lg gap-2 mb-1">
          <input
            type="checkbox"
            value={gender}
            checked={genderFilter.includes(gender)}
            onChange={handleGenderCheckboxChange}
            className="form-checkbox w-4 h-4 rounded-lg"
          />
          <span>{gender}</span>
        </label>
      ))}
    </div>
  )}
  </div>

 
</div>


          {/* Price Filter */}
          <div className="mb-4">
            <label htmlFor="priceFilter" className="block text-sm font-medium text-gray-700">Filter by Price</label>
            <div className="flex items-center justify-between">
              <span>{minPrice.toLocaleString()} VND</span>
              <span>{maxPrice.toLocaleString()} VND</span>
            </div>
            <div className="mt-4">
              <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">Min Price</label>
              <input
                type="range"
                id="minPrice"
                min="1000000"
                max="7000000"
                step="500000"
                value={minPrice}
                onChange={handleMinPriceChange}
                className="w-full"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">Max Price</label>
              <input
                type="range"
                id="maxPrice"
                min="1000000"
                max="7000000"
                step="500000"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                className="w-full"
              />
            </div>
          </div>

          {/* Under 1,000,000 Checkbox */}
          <div className="mb-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isUnder1000000}
                onChange={handleUnder1000000Change}
                className="form-checkbox"
              />
              <span>Under 1,000,000 VND</span>
            </label>
          </div>
        </div>

        {/* Product List */}
        <div className={`transition-all duration-300 ${isFilterVisible ? 'w-4/5' : 'w-full'}`}>
          <div className="grid grid-cols-3 gap-4 transition-all duration-300">
            {filteredProducts.map((product) => (
              <ShoesCard 
                key={product.id} 
                product={product} 
                isFilterVisible={isFilterVisible} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
