import React, { useState } from 'react';
import useProducts from '../../../hooks/useProducts';
import { Link } from 'react-router-dom';
import ProductDetailCard from '../../../components/admin/product/ProductDetailCard';

const ProductList = () => {
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

  return (
    <div className="p-4 bg-gray-100">
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

      <div className="overflow-x-auto p-6 border-gray-200 border bg-white rounded-2xl">
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
            {products.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="border border-gray-200 p-2">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-20 h-20 object-cover"
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
                    className=""
                  >
                   <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="1"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                  </button>
                  <Link to={`/admin/products/edit/${product.id}`}>
                    <button className="">
                    <svg width="24px" height="24px" fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" d="M14.8024118,6.44526791 L8.69610276,12.549589 C8.29095108,12.9079238 8.04030835,13.4092335 8,13.8678295 L8,16.0029438 L10.0639829,16.004826 C10.5982069,15.9670062 11.0954869,15.7183782 11.4947932,15.2616227 L17.556693,9.19972295 L14.8024118,6.44526791 Z M16.2168556,5.0312846 L18.9709065,7.78550938 L19.8647941,6.89162181 C19.9513987,6.80501747 20.0000526,6.68755666 20.0000526,6.56507948 C20.0000526,6.4426023 19.9513987,6.32514149 19.8647932,6.23853626 L17.7611243,4.13485646 C17.6754884,4.04854589 17.5589355,4 17.43735,4 C17.3157645,4 17.1992116,4.04854589 17.1135757,4.13485646 L16.2168556,5.0312846 Z M22,13 L22,20 C22,21.1045695 21.1045695,22 20,22 L4,22 C2.8954305,22 2,21.1045695 2,20 L2,4 C2,2.8954305 2.8954305,2 4,2 L11,2 L11,4 L4,4 L4,20 L20,20 L20,13 L22,13 Z M17.43735,2 C18.0920882,2 18.7197259,2.26141978 19.1781068,2.7234227 L21.2790059,4.82432181 C21.7406843,5.28599904 22.0000526,5.91216845 22.0000526,6.56507948 C22.0000526,7.21799052 21.7406843,7.84415992 21.2790068,8.30583626 L12.9575072,16.6237545 C12.2590245,17.4294925 11.2689,17.9245308 10.1346,18.0023295 L6,18.0023295 L6,17.0023295 L6.00324765,13.7873015 C6.08843822,12.7328366 6.57866679,11.7523321 7.32649633,11.0934196 L15.6953877,2.72462818 C16.1563921,2.2608295 16.7833514,2 17.43735,2 Z"></path> </g></svg>
                    </button>
                  </Link>
                  <button
                    onClick={() => handleShowDetail(product)}
                    className=""
                  >
                                               <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>Hide password</title><desc>Created with Sketch.</desc><g id="Icons-/-Forms-/-Password-/-Hide" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Icon/Interface/Eye/Slash/Black"><rect id="Container" x="0" y="0" width="24" height="24"></rect><g id="eye-slash" transform="translate(1.000000, 1.000000)" fill="#000000" fill-rule="nonzero"><path d="M9.94,5.08 C10.2907639,5.02623324 10.6451396,4.99948791 11,5 C14.18,5 17.17,7.29 18.91,11 C18.6438891,11.5645923 18.3433222,12.1122919 18.01,12.64 C17.9041777,12.8038098 17.8485624,12.9949873 17.85,13.19 C17.8545776,13.638491 18.1572094,14.0290749 18.5903469,14.1455097 C19.0234843,14.2619445 19.4811652,14.0757457 19.71,13.69 C20.1759266,12.95793 20.5806338,12.1886518 20.92,11.39 C21.0284252,11.1378274 21.0284252,10.8521726 20.92,10.6 C18.9,5.91 15.1,2.99990136 11,2.99990136 C10.5306669,2.9976351 10.0620847,3.03779929 9.6,3.12 C9.2427344,3.18073514 8.94500919,3.42745566 8.81897458,3.76722432 C8.69293996,4.10699297 8.7577436,4.48819082 8.98897458,4.76722433 C9.22020556,5.04625783 9.58273441,5.18073516 9.94,5.12 L9.94,5.08 Z M2.71,1.29 C2.45634143,1.03634143 2.08662601,0.937276483 1.74012196,1.03012196 C1.39361791,1.12296744 1.12296744,1.39361791 1.03012196,1.74012196 C0.937276483,2.08662601 1.03634143,2.45634143 1.29,2.71 L4.39,5.8 C2.97557308,7.16152828 1.84985681,8.79398692 1.08,10.6 C0.968686852,10.8550505 0.968686852,11.1449495 1.08,11.4 C3.1,16.09 6.9,19 11,19 C12.7971076,18.9875864 14.5517705,18.4525011 16.05,17.46 L19.29,20.71 C19.4777666,20.8993127 19.7333625,21.0057983 20,21.0057983 C20.2666375,21.0057983 20.5222334,20.8993127 20.71,20.71 C20.8993127,20.5222334 21.0057983,20.2666375 21.0057983,20 C21.0057983,19.7333625 20.8993127,19.4777666 20.71,19.29 L2.71,1.29 Z M9.07,10.48 L11.52,12.93 C11.3509866,12.9784661 11.1758132,13.0020472 11,13 C9.8954305,13 9,12.1045695 9,11 C8.99795283,10.8241868 9.02153387,10.6490134 9.07,10.48 L9.07,10.48 Z M11,17 C7.82,17 4.83,14.71 3.1,11 C3.74608887,9.57374827 4.66307117,8.28657682 5.8,7.21 L7.57,9 C6.71601758,10.5586149 6.99283089,12.4937785 8.24952622,13.7504738 C9.50622154,15.0071691 11.4413851,15.2839824 13,14.43 L14.59,16 C13.501093,16.6408815 12.2634245,16.985636 11,17 Z" id="Shape"></path></g></g></g></svg>

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
