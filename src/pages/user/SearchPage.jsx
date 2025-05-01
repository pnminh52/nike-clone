import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ShoesCard from "../../components/user/etc/ShoesCard";

const SearchPage = () => {
  const { keyword } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dữ liệu từ API JSON Server
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products`);
        const data = await response.json();
        setProducts(data); // Lưu danh sách sản phẩm vào state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Lọc sản phẩm theo từ khóa tìm kiếm
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div className="max-w-screen-2xl mx-auto px-10">
      <h1 className="text-xl font-bold">
        Search results for {keyword} ({filteredProducts.length})
      </h1>
<div className="flex items-center justify-between ">
<div className="w-1/5">

</div>
      <div className="w-4/5">
      {loading ? (
        <p>Đang tải...</p>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {filteredProducts.map((product) => (
            <ShoesCard key={product.id} product={product} isFilterVisible={true} /> // Sử dụng ShoesCard ở đây
          ))}
        </div>
      ) : (
        <p>Không tìm thấy sản phẩm nào!</p>
      )}
      </div>
</div>
    </div>
  );
};

export default SearchPage;
