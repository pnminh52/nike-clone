import React from 'react';
import useProducts from '../../../hooks/useProducts';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const { products, handleDeleteProduct } = useProducts();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Product List</h1>
      
      <Link to="/admin/products/add">
        <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Product</button>
      </Link>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
            <th className="border p-2 text-left">Image</th>
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Category</th>

              
              <th className="border p-2 text-left">Status</th>
              <th className="border p-2 text-left">Style</th>
              <th className="border p-2 text-left">Price</th>

              <th className="border p-2 text-left">Stock</th>
              <th className="border p-2 text-left">Brand</th>

              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">
                 <td className="border p-2">
                  <img src={product.img} alt={product.name} className="w-20 h-20 object-cover" />
                </td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">{product.category}</td>
               
                                <td className="border p-2">{product.status}</td>
                                <td className="border p-2">{product.style}</td>
                                <td className="border p-2">{product.price}</td>
                                <td className="border p-2">{product.stock}</td>
                                <td className="border p-2">{product.brand}</td>
                
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <Link to={`/admin/products/edit/${product.id}`}>
                    <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                      Edit
                    </button>
                  </Link>
                  <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                      Detail
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
