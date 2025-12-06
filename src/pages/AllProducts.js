import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "../services/API";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchAllProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="all-products-page">
      <h2>Tous les produits</h2>

      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>

            <img src={product.image} alt={product.title} />

            <h4>{product.title}</h4>
            <p>{product.price} $</p>

            <button>View item</button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
