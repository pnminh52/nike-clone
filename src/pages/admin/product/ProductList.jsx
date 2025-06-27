import React, { useState } from 'react';
import useProducts from '../../../hooks/useProducts';
import { Link } from 'react-router-dom';
import ProductDetailCard from '../../../components/admin/product/ProductDetailCard';
import FilterProduct from './../../../components/admin/product/FilterProduct';

const ProductList = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [stockFilter, setStockFilter] = useState('');
  const { products, handleDeleteProduct } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const handleShowDetail = (product) => {
    setSelectedProduct(product);
    setShowDetail(true);
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

    return matchStatus && matchStock;
  })
  .sort((a, b) => {
    if (priceFilter === 'asc') return a.price - b.price;
    if (priceFilter === 'desc') return b.price - a.price;
    return 0;
  });

  
  
  const handleCloseDetail = () => {
    setSelectedProduct(null);
    setShowDetail(false);
  };

  return (
    <div className="p-4 space-y-4 bg-gray-100">
      <h1 className="text-2xl font-semibold mb-4">Product List</h1>
      <div className='grid grid-cols-4 gap-2'>
        <div>
          <p>Total product</p>
          <p>{products.length}</p>
        </div>

      </div>

      <Link to="/admin/dashboard/products/add">
        <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Add Product
        </button>
      </Link>
      <FilterProduct
  onStockChange={setStockFilter}
  onPriceChange={setPriceFilter}
  onStatusChange={setStatusFilter}
  stockFilter={stockFilter}
  priceFilter={priceFilter}
  statusFilter={statusFilter}

/>

      <div className='bg-white flex gap-4 rounded-2xl p-4 justify-between items-center'>
        <input type="text" placeholder='search here ' className=' bg-gray-100 px-4 py-2  border border-gray-300 ' />
    
      <p>Sort By</p>
    
      </div>

      <div className="overflow-x-auto p-4 border-gray-200 border bg-white rounded-2xl">
        <table className="min-w-full border bg-white">
          <thead className="bg-white ">
            <tr>
              <th className=" p-2 text-center font-medium inter">Image</th>
              <th className=" p-2 text-center font-medium inter">Name</th>
              <th className=" p-2 text-center font-medium inter">Category</th>
              <th className=" p-2 text-center font-medium inter">Status</th>
              <th className=" p-2 text-center font-medium inter">Price</th>
              <th className=" p-2 text-center font-medium inter">Stock</th>
              <th className=" p-2 text-center font-medium inter">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="border border-gray-200 p-2 items-center text-center justify-center">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-20 h-20 rounded-lg object-cover cursor-pointer"
                  />
                </td>
                <td className="border border-gray-200 p-2 text-center">{product.name}</td>
                <td className="border border-gray-200 p-2 text-center">{product.category}</td>
                <td className="border border-gray-200 p-2 text-center">{product.status}</td>
                <td className="border border-gray-200 p-2 text-center">{product.price}</td>
                <td className="border border-gray-200 p-2 text-center">{product.stock}</td>
                <td className="border border-gray-200 p-2 justify-center mx-auto space-x-2">
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="cursor-pointer"
                  >
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="1"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                  </button>
                  <Link to={`/admin/products/edit/${product.id}`}>
                    <button className="cursor-pointer">
                      <svg width="24px" height="24px" fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" d="M14.8024118,6.44526791 L8.69610276,12.549589 C8.29095108,12.9079238 8.04030835,13.4092335 8,13.8678295 L8,16.0029438 L10.0639829,16.004826 C10.5982069,15.9670062 11.0954869,15.7183782 11.4947932,15.2616227 L17.556693,9.19972295 L14.8024118,6.44526791 Z M16.2168556,5.0312846 L18.9709065,7.78550938 L19.8647941,6.89162181 C19.9513987,6.80501747 20.0000526,6.68755666 20.0000526,6.56507948 C20.0000526,6.4426023 19.9513987,6.32514149 19.8647932,6.23853626 L17.7611243,4.13485646 C17.6754884,4.04854589 17.5589355,4 17.43735,4 C17.3157645,4 17.1992116,4.04854589 17.1135757,4.13485646 L16.2168556,5.0312846 Z M22,13 L22,20 C22,21.1045695 21.1045695,22 20,22 L4,22 C2.8954305,22 2,21.1045695 2,20 L2,4 C2,2.8954305 2.8954305,2 4,2 L11,2 L11,4 L4,4 L4,20 L20,20 L20,13 L22,13 Z M17.43735,2 C18.0920882,2 18.7197259,2.26141978 19.1781068,2.7234227 L21.2790059,4.82432181 C21.7406843,5.28599904 22.0000526,5.91216845 22.0000526,6.56507948 C22.0000526,7.21799052 21.7406843,7.84415992 21.2790068,8.30583626 L12.9575072,16.6237545 C12.2590245,17.4294925 11.2689,17.9245308 10.1346,18.0023295 L6,18.0023295 L6,17.0023295 L6.00324765,13.7873015 C6.08843822,12.7328366 6.57866679,11.7523321 7.32649633,11.0934196 L15.6953877,2.72462818 C16.1563921,2.2608295 16.7833514,2 17.43735,2 Z"></path> </g></svg>
                    </button>
                  </Link>
                  <button
                    onClick={() => handleShowDetail(product)}
                    className="cursor-pointer"
                  >
                    <svg
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#000000"
                    >
                      <g transform="translate(1, 4)" fill="#000000">
                        <path d="M20.92,7.6 C18.9,2.91 15.1,0 11,0 C6.9,0 3.1,2.91 1.08,7.6 C0.968686852,7.85505046 0.968686852,8.14494954 1.08,8.4 C3.1,13.09 6.9,16 11,16 C15.1,16 18.9,13.09 20.92,8.4 C21.0313131,8.14494954 21.0313131,7.85505046 20.92,7.6 Z M11,14 C7.83,14 4.83,11.71 3.1,8 C4.83,4.29 7.83,2 11,2 C14.17,2 17.17,4.29 18.9,8 C17.17,11.71 14.17,14 11,14 Z M11,4 C8.790861,4 7,5.790861 7,8 C7,10.209139 8.790861,12 11,12 C13.209139,12 15,10.209139 15,8 C15,6.93913404 14.5785726,5.92171839 13.8284271,5.17157288 C13.0782816,4.42142736 12.060866,4 11,4 Z M11,10 C9.8954305,10 9,9.1045695 9,8 C9,6.8954305 9.8954305,6 11,6 C12.1045695,6 13,6.8954305 13,8 C13,9.1045695 12.1045695,10 11,10 Z" />
                      </g>
                    </svg>

                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showDetail && selectedProduct && (
        <div className="mt-4">
          <ProductDetailCard product={selectedProduct} onClose={handleCloseDetail} />
        </div>
      )}
    </div>
  );
};

export default ProductList;
