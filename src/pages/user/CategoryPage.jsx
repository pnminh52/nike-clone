import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShoesCard from "../../components/user/etc/ShoesCard";
import SidebarFilter from "../../components/user/productList/SidebarFilter";
import CategoryTopBar from "../../components/user/productList/CategoryTopBar";
const CategoryPage = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortType, setSortType] = useState(null);
  const API_URL = "http://localhost:3000";
  const [showPopup, setShowPopup] = useState(false);

  const [genderFilter, setGenderFilter] = useState([]);
  const [technologyFilter, setTechnologyFilter] = useState([]);
  const [colorFilter, setColorFilter] = useState([]);
  const [featuresFilter, setFeaturesFilter] = useState([]);
  const [brandFilter, setBrandFilter] = useState([]);
  const [isUnder1000000, setIsUnder1000000] = useState(false);
  const [statusFilter, setStatusFilter] = useState([]);
  const [heightFilter, setHeightFilter] = useState([]);
  const [forFilter, setForFilter] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const categoriesResponse = await fetch(`${API_URL}/categories`);
        const categoriesData = await categoriesResponse.json();

        const productsResponse = await fetch(`${API_URL}/products`);
        const productsData = await productsResponse.json();

        const category = categoriesData.find(
          (cat) => cat.name === decodeURIComponent(name)
        );
        if (category) {
          const filteredProducts = productsData.filter(
            (product) => product.category === category.name
          );

          const groupedProducts = filteredProducts.reduce((acc, product) => {
            const key = `${product.name}-${product.price}-${product.price_sale}-${product.gender}`;

            if (!acc[key]) {
              acc[key] = {
                ...product,
                variants: [],
              };
            }

            if (product.position === 1) {
              acc[key].mainImage = product.img;
            }

            acc[key].variants = acc[key].variants || [];
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
    const variants = Array.isArray(product.variants) ? product.variants : [];

    if (
      genderFilter.length > 0 &&
      !variants.some((variant) => genderFilter.includes(variant.gender))
    ) {
      return false;
    }
    if (
      brandFilter.length > 0 &&
      !variants.some((variant) => brandFilter.includes(variant.brand))
    ) {
      return false;
    }
    if (
      technologyFilter.length > 0 &&
      !variants.some((variant) => technologyFilter.includes(variant.technology))
    ) {
      return false;
    }
    if (
      featuresFilter.length > 0 &&
      !variants.some((variant) => featuresFilter.includes(variant.features))
    ) {
      return false;
    }
    if (
      colorFilter.length > 0 &&
      !variants.some((variant) => colorFilter.includes(variant.mainColor))
    ) {
      return false;
    }
    if (
      statusFilter.length > 0 &&
      !variants.some((variant) => statusFilter.includes(variant.status))
    ) {
      return false;
    }
    if (
      heightFilter.length > 0 &&
      !variants.some((variant) => heightFilter.includes(variant.height))
    ) {
      return false;
    }
    if (
      forFilter.length > 0 &&
      !variants.some((variant) => forFilter.includes(variant.shoesFor))
    ) {
      return false;
    }

    if (isUnder1000000) {
      const prices = variants
        .map((variant) => variant.price)
        .filter((price) => typeof price === "number");
      const minPriceProduct = Math.min(...prices);
      if (minPriceProduct >= 1000000 || !prices.length) {
        return false;
      }
    }

    return true;
  });

  const sortedProducts = [...filteredProducts];
  if (sortType === "priceLowHigh") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortType === "priceHighLow") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortType === "newest") {
    sortedProducts.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  return (
    <div className=" container  mx-auto px-0 sm:px-10 max-w-screen-2xl ">
      <CategoryTopBar
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
        category={forFilter}
        categoryName={decodeURIComponent(name || "")}
        filteredProductsLength={
          Array.isArray(sortedProducts) ? sortedProducts.length : 0
        }
        onSortChange={setSortType}
      />

      <div className="flex justify-between ">
      <div className="w-[18%] h-full hidden sm:block sticky top-0">
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-1.5 sm:gap-2">
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
