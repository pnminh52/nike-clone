import React from 'react'
import useProducts from '../../../hooks/useProducts';
import { Link } from 'react-router-dom';
const ProductList = () => {
    const {products, handleDeleteProduct } = useProducts();
  return (
    <div>
        <h1>Product List</h1>
        <Link to="/admin/products/add">
        <button>Add Product</button>
      </Link>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.des} - <img src={product.img} alt="" />
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
            <Link to={`/admin/products/edit/${product.id}`}>
              <button>Edit</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
