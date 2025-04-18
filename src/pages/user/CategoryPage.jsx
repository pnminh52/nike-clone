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
const [isScrolled, setIsScrolled]=useState(false)
  const [loading, setLoading] = useState(false); // State for loading status

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
          // Filter products based on category name (which should match category con)
          const filteredProducts = productsData.filter(
            (product) => product.category === category.name
          );
          setProducts(filteredProducts);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name]); // Dependency on category name to refetch when it changes
useEffect(()=>{
  const handleScroll = () => {
    const offset = window.scrollY;
    setIsScrolled(offset > 14); // có thể chỉnh con số này tùy ý
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
},[])
  return (
    <div className="h-900 max-w-screen-2xl px-10 mx-auto">
      <div className="flex justify-between items-center h-18 sticky top-0 bg-white z-10">
      <p
        className={`inter transition-all duration-300 ${
          isScrolled ? "text-lg" : "text-2xl"
        }`}
      >
        {decodeURIComponent(name || "")} ({products.length})
      </p>
        <div className="flex items-center gap-6">
        <p className=' cursor-pointer flex  gap-1 items-center' onClick={() => setIsFilterVisible(!isFilterVisible)}>
  {isFilterVisible ? 'Hide Filters' : 'Show Filters'}
  {/* <svg aria-hidden="true" class="icon-filter-ds" focusable="false" viewBox="0 0 24 24" role="img" width="24px" height="24px" fill="none"><path stroke="currentColor" stroke-width="1.5" d="M21 8.25H10m-5.25 0H3"></path><path stroke="currentColor" stroke-width="1.5" d="M7.5 6v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clip-rule="evenodd"></path><path stroke="currentColor" stroke-width="1.5" d="M3 15.75h10.75m5 0H21"></path><path stroke="currentColor" stroke-width="1.5" d="M16.5 13.5v0a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clip-rule="evenodd"></path></svg> */}
</p>

          <p className='flex gap-1 items-center'>Sort By
          {/* <svg className='rotate-90' strokeWidth={"1"} aria-hidden="true" fill="#111" height="14px" width="14px" viewBox="0 0 185.4 300"><path d="M7.3 292.7c-9.8-9.8-9.8-25.6 0-35.4L114.6 150 7.3 42.7c-9.8-9.8-9.8-25.6 0-35.4s25.6-9.8 35.4 0L185.4 150 42.7 292.7c-4.9 4.8-11.3 7.3-17.7 7.3-6.4 0-12.7-2.5-17.7-7.3z"></path></svg> */}

          </p>
        </div>
      </div>
      <div className="flex gap-2">
  {/* Sidebar */}
  <div
    className={`transition-all  duration-300 ${
      isFilterVisible ? 'w-1/5 opacity-100' : 'w-0 opacity-0 overflow-hidden'
    }`}
  >
   <ul className="  text-black text-md inter space-y-2 sticky top-18 z-10">
  <li className='cursor-pointer'>Shoes</li>
  <li className='cursor-pointer'>Tops & T-Shirts</li>
  <li className='cursor-pointer'>Hoodies & Sweatshirts</li>
  <li className='cursor-pointer'>Jackets</li>
  <li className='cursor-pointer'>Trousers & Tights</li>
  <li className='cursor-pointer'>Shorts</li>
  <li className='cursor-pointer'>Tracksuits</li>
  <li className='cursor-pointer'>Skirts & Dresses</li>
  <li className='cursor-pointer'>Socks</li>
  <li className='cursor-pointer'>Accessories & Equipment</li>
</ul>

  </div>

  {/* Danh sách sản phẩm */}
  <div
    className={`transition-all duration-300 ${
      isFilterVisible ? 'w-4/5' : 'w-full'
    }`}
  >
    <div className="grid grid-cols-5 gap-4 transition-all duration-300">
    
      {products.map((product) => (
        <ShoesCard key={product.id} product={product} isFilterVisible={isFilterVisible} />
      ))}
    </div>
    <div>
      <p>content hahah</p>
    </div>
  </div>
</div>


    </div>
  );
};

export default CategoryPage;
