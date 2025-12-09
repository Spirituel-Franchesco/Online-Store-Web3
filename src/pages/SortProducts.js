// src/pages/SortProducts.js
import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "../services/API";
import { Link } from "react-router-dom";

const SortProducts = () => {
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("none"); // "asc" | "desc" | "none"

  useEffect(() => {
    fetchAllProducts()
      .then((res) => {
        setProducts(res.data);
        setOriginalProducts(res.data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOrder(value);

    if (value === "none") {
      setProducts(originalProducts);
      return;
    }

    const sorted = [...originalProducts].sort((a, b) => {
      if (value === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    setProducts(sorted);
  };

  const getTitle = () => {
    if (sortOrder === "asc") return "Price Low To High";
    if (sortOrder === "desc") return "Price High To Low";
    return "Please select an option";
  };

  return (
    <div className="sort-products-page">
      {/* Bandeau vert avec radios à droite */}
      <div className="sort-banner">
        <div className="sort-radios">
          <label>
            <input
              type="radio"
              name="price-sort"
              value="asc"
              checked={sortOrder === "asc"}
              onChange={handleSortChange}
            />
            Price low to high
          </label>

          <label>
            <input
              type="radio"
              name="price-sort"
              value="desc"
              checked={sortOrder === "desc"}
              onChange={handleSortChange}
            />
            Price high to low
          </label>
        </div>
      </div>

      {/* Titre centré */}
      <h2 className="sort-title">{getTitle()}</h2>

      {/* Produits : seulement si un tri est sélectionné */}
      {sortOrder !== "none" && (
        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.title} />
              <h4>{product.title}</h4>
              <p className="product-price">{product.price} $</p>
              <p className="product-description">{product.description}</p>

              <Link to={`/product/${product.id}`}>
                <button className="view-button">View item</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortProducts;
