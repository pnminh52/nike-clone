import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ShoesCard from '../../components/user/ShoesCard';
import { Link } from 'react-router-dom';

const CategoryPage = () => {
  const { name } = useParams(); // Getting the category name from URL
  const [products, setProducts] = useState([]); // State to store products
  const [categories, setCategories] = useState([]); // State to store categories
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [loading, setLoading] = useState(true); // State for loading status

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

  return (
    <div className="h-900 max-w-screen-xl px-4 mx-auto">
      <div className="flex justify-between items-center py-6">
        <p className="inter text-xl">
          {decodeURIComponent(name || '')} ({products.length})
        </p>
        <div className="flex items-center gap-4">
          <p className='inter'>Hide Filters</p>
          <p className='inter'>Sort By</p>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="w-1/5 ">
          <p>Category Sidebar (20%)</p>
        </div>
        <div className="w-4/5">


  {/* Danh sách sản phẩm */}
  <div className="grid grid-cols-3 gap-2">
      {/* Ảnh của category được chọn */}
      {selectedCategory && (
       
         <div className='relative'>
          <Link to={`/products/:name`}>
          <img
                      src={selectedCategory.imageUrl}
                      alt={selectedCategory.name}
                      className="w-[324px] h-[324px] object-cover cursor-pointer"
                    /></Link>
         </div>
        
      )}
    {products.map((product) => (
      <ShoesCard key={product.id} product={product} />
    ))}
  </div>
</div>

      </div>
    </div>
  );
};

export default CategoryPage;
