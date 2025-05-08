import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ShoesCard from '../../components/user/etc/ShoesCard';
import SidebarFilter from '../../components/user/productList/SidebarFilter';
import CategoryTopBar from '../../components/user/productList/CategoryTopBar';
const CategoryPage = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState(null);
 



  const [genderFilter, setGenderFilter] = useState([]);
  const [isUnder1000000, setIsUnder1000000] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const categoriesResponse = await fetch(`http://localhost:3000/categories`);
        const categoriesData = await categoriesResponse.json();

        const productsResponse = await fetch(`http://localhost:3000/products`);
        const productsData = await productsResponse.json();

        const category = categoriesData.find(cat => cat.name === decodeURIComponent(name));
        if (category) {
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
              acc[key].mainImage = product.img;
            }
            acc[key].variants.push(product);
            return acc;
          }, {});

          setProducts(Object.values(groupedProducts));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);

  const filteredProducts = products.filter((product) => {
    // Filter by gender
    if (genderFilter.length > 0 && !product.variants.some((variant) => genderFilter.includes(variant.gender))) {
      return false;
    }

    // Filter by "Under 1,000,000 VND" checkbox
    if (isUnder1000000) {
      const minPriceProduct = Math.min(...product.variants.map((variant) => variant.price));
      if (minPriceProduct >= 1000000) {
        return false;
      }
    }

    return true;
  });
  const sortedProducts = [...filteredProducts]; // copy để không mutate state
  if (sortType === "priceLowHigh") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortType === "priceHighLow") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortType === "newest") {
    sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  
  return (
    <div className=" max-w-screen-2xl px-10 mx-auto">
     <CategoryTopBar 
  categoryName={decodeURIComponent(name || "")} 
  filteredProductsLength={sortedProducts.length}
  onSortChange={setSortType}
/>


      <div className="flex gap-2">
        <div className="w-1/5">
          <SidebarFilter
            genderFilter={genderFilter}
            setGenderFilter={setGenderFilter}
            isUnder1000000={isUnder1000000}
            setIsUnder1000000={setIsUnder1000000}
          />
        </div>

        <div className="w-4/5">
          <div className="grid grid-cols-3 gap-4">
            {sortedProducts.map((product) => (
              <ShoesCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
