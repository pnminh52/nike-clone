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
  const API_URL = "https://nikejsonserver-2.onrender.com";




  const [genderFilter, setGenderFilter] = useState([]);
  const [technologyFilter, setTechnologyFilter] = useState([]);
  const [colorFilter, setColorFilter] = useState([]);
  const [featuresFilter, setFeaturesFilter] = useState([]);
  const [brandFilter, setBrandFilter] = useState([])
  const [isUnder1000000, setIsUnder1000000] = useState(false);
  const [statusFilter, setStatusFilter] = useState([])
  const [heightFilter, setHeightFilter] = useState([])
  const [forFilter, setForFilter] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const categoriesResponse = await fetch(`${API_URL}/categories`);
        const categoriesData = await categoriesResponse.json();

        const productsResponse = await fetch(`${API_URL}/products`);
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

    if (genderFilter.length > 0 && !product.variants.some((variant) => genderFilter.includes(variant.gender))) {
      return false;
    }
    if (brandFilter.length > 0 && !product.variants.some((variant) => brandFilter.includes(variant.brand))) {
      return false;
    }
    if (technologyFilter.length > 0 && !product.variants.some((variant) => technologyFilter.includes(variant.technology))) {
      return false;
    }
    if (featuresFilter.length > 0 && !product.variants.some((variant) => featuresFilter.includes(variant.features))) {
      return false;
    }
    if (colorFilter.length > 0 && !product.variants.some((variant) => colorFilter.includes(variant.mainColor))) {
      return false;
    }
    if (statusFilter.length > 0 && !product.variants.some((variant) => statusFilter.includes(variant.status))) {
      return false;
    }
    if (heightFilter.length > 0 && !product.variants.some((variant) => heightFilter.includes(variant.height))) {
      return false;
    }
    if (forFilter && !product.variants.some((variant) => variant.shoesFor === forFilter)) {
      return false;
    }
    

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
    <div className=" container  mx-auto px-0 sm:px-10 max-w-screen-2xl ">
      <CategoryTopBar
      category={forFilter}
        categoryName={decodeURIComponent(name || "")}
        filteredProductsLength={sortedProducts.length}
        onSortChange={setSortType}
        forFilter={forFilter}
        setForFilter={setForFilter}
      />


      <div className="flex justify-between ">
        <div className="w-[18%] h-screen overflow-y-auto hidden sm:block">
          <SidebarFilter
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
          />
        </div>

        <div className="w-full sm:w-4/5">
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-1.5">
    {sortedProducts.map((product) => (
      <ShoesCard 
      key={product.id} 
      product={product}
       />
    ))}
  </div>
</div>

      </div>
    </div>
  );
};

export default CategoryPage;
