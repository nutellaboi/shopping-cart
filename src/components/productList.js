import React, { useEffect, useState } from "react";
import { fetchProducts } from "../services/api";

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    getProducts();
  }, []);

  return (
    <div className="product-list">
      <h1>Products</h1>
      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="product">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
