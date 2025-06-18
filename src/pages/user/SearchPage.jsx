import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ShoesCard from "../../components/user/etc/ShoesCard";
import { Link } from "react-router-dom";
import { useWish } from "../../hooks/useWish";
const SearchPage = () => {
  
  const { keyword } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products`);
        const data = await response.json();
        setProducts(data); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase())
  );


  return (
    <div className="max-w-screen-2xl mx-auto ">
     
<div className="flex items-center justify-between px-0 sm:px-10 ">
    
      { filteredProducts.length > 0 ? (
               <div>
                 <h2 className="text-2xl py-5 px-6 sm:px-0"> <span>{filteredProducts.length}</span> Results found</h2>
                
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-1.5 sm:gap-2 ">
                          {filteredProducts.map((product) => (
                            <ShoesCard key={product.id} product={product} isFilterVisible={true} /> 
                          ))}
                        </div>
               </div>
      ) : (
        <div className="h-100 flex items-center mx-auto justify-center">
                    <div className="text-center">
                    <p>No products found.</p>
                     <Link >
                     <p className=" text-blue-600 underline">
                     Try searching with a different keyword.
                      </p></Link>
                    </div>
                  </div>
       
      )}
     
</div>
    </div>
  );
};

export default SearchPage;
