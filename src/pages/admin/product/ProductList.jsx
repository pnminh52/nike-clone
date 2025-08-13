import React, { useState } from 'react';
import useProducts from '../../../hooks/useProducts';
import { Link } from 'react-router-dom';
import ProductDetailCard from '../../../components/admin/product/ProductDetailCard';
import FilterProduct from './../../../components/admin/product/FilterProduct';
import ProductTable from './../../../components/admin/product/ProductTable';

const ProductList = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [stockFilter, setStockFilter] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const { products, handleDeleteProduct } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const handleShowDetail = (product) => {
    setSelectedProduct(product);
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setSelectedProduct(null);
    setShowDetail(false);
  };

  const filteredProducts = products
    .filter((p) => {
      const matchStatus = statusFilter ? p.status === statusFilter : true;

      const matchStock =
        stockFilter === ''
          ? true
          : stockFilter === 'under25'
          ? p.stock < 25
          : stockFilter === '25to49'
          ? p.stock >= 25 && p.stock < 50
          : stockFilter === '50to74'
          ? p.stock >= 50 && p.stock < 75
          : stockFilter === '75to99'
          ? p.stock >= 75 && p.stock < 100
          : stockFilter === 'over100'
          ? p.stock > 100
          : true;

      const matchSearch = searchKeyword
        ? p.name.toLowerCase().includes(searchKeyword.toLowerCase())
        : true;

      return matchStatus && matchStock && matchSearch;
    })
    .sort((a, b) => {
      if (priceFilter === 'asc') return a.price - b.price;
      if (priceFilter === 'desc') return b.price - a.price;
      return 0;
    });

  return (
    <div className="p-4 h-full">
      <h1 className="nike-title-for-mobile">Manage product list</h1>
      <p>You can view details and edit product information.</p>

      <div className="grid grid-cols-4 gap-2 py-6">
  <div className="space-y-2 p-4 rounded-2xl border border-gray-300 cursor-pointer flex flex-col items-center justify-center">
    <p className="nike-title-for-table">Total product</p>
    <p className="text-xl">{products.length}</p>
  </div>

  <div className="space-y-2 p-4 rounded-2xl border border-gray-300 cursor-pointer flex flex-col items-center justify-center">
    <p className="nike-title-for-table">In Stock</p>
    <p className="text-xl">
      {products.filter((p) => p.stock > 0).length}
    </p>
  </div>

  <div className="space-y-2 p-4 rounded-2xl border border-gray-300 cursor-pointer flex flex-col items-center justify-center">
    <p className="nike-title-for-table">Coming Soon</p>
    <p className="text-xl">
      {products.filter((p) => p.status === 'Coming Soon').length}
    </p>
  </div>

  <div className="space-y-2 p-4 rounded-2xl border border-gray-300 cursor-pointer flex flex-col items-center justify-center">
    <p className="nike-title-for-table">Just In</p>
    <p className="text-xl">
      {products.filter((p) => p.status === 'Just In').length}
    </p>
  </div>
</div>


     

      <FilterProduct
        onStockChange={setStockFilter}
        onPriceChange={setPriceFilter}
        onStatusChange={setStatusFilter}
        onSearchChange={setSearchKeyword}
        stockFilter={stockFilter}
        priceFilter={priceFilter}
        statusFilter={statusFilter}
        searchKeyword={searchKeyword}
      />

      
      
 {
      filteredProducts.length > 0 ? (
        <ProductTable
        products={filteredProducts}
        handleDeleteProduct={handleDeleteProduct}
        handleShowDetail={handleShowDetail}
      />
      ):(
        <p className="text-gray-500 flex w-full justify-center text-sm italic mt-8">
    No products found matching your filters or search keyword.
    </p>
      )
     }

      {showDetail && selectedProduct && (
        <div className="mt-4">
          <ProductDetailCard
            product={selectedProduct}
            onClose={handleCloseDetail}
          />
        </div>
      )}
    </div>
  );
};

export default ProductList;
