// src/pages/SortProducts.js
import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "../services/API";

const SortProducts = () => {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("none"); // "asc", "desc" ou "none"

  useEffect(() => {
    fetchAllProducts()
      .then((res) => {
        setProducts(res.data);
        setOriginalProducts(res.data); // on garde une copie d'origine
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOrder(value);

    if (value === "none") {
      // revenir à la version originale
      setProducts(originalProducts);
      return;
    }

    const sorted = [...products].sort((a, b) => {
      if (value === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    setProducts(sorted);
  };

  const handleReset = () => {
    setSortOrder("none");
    setProducts(originalProducts);
  };

  return (
    <div className="sort-products-page">
      <h2>Trier les produits par prix</h2>

      <div className="sort-controls">
        <select value={sortOrder} onChange={handleSortChange}>
          <option value="none">Choisir un tri</option>
          <option value="asc">Prix croissant</option>
          <option value="desc">Prix décroissant</option>
        </select>

        <button onClick={handleReset}>Reset</button>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <h4>{product.title}</h4>
            <p>{product.price} $</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortProducts;
