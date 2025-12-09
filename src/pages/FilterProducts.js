import React, { useEffect, useState } from "react";
import {
  fetchAllProducts,
  fetchCategories,
  fetchProductsByCategory,
} from "../services/API";
import { Link } from "react-router-dom";

const FilterProducts = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState("all");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchCategories()
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));

    fetchAllProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Met la catégorie affichée en majuscule comme "Electronics", "Jewelery", etc.
  const formatLabel = (cat) => {
    if (!cat || cat === "all") return "All Products";
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  const handleCategoryChange = async (e) => {
    const value = e.target.value;
    setSelectedCat(value);

    if (value === "all") {
      const res = await fetchAllProducts();
      setProducts(res.data);
    } else {
      const res = await fetchProductsByCategory(value);
      setProducts(res.data);
    }
  };

  const handleReset = async () => {
    setSelectedCat("all");
    const res = await fetchAllProducts();
    setProducts(res.data);
  };

  return (
    <div className="filter-products-page">

      {/* ----- BANDEAU VERT ----- */}
      <div className="filter-banner">
        <div className="filter-controls">
          <select
            value={selectedCat}
            onChange={handleCategoryChange}
            className="filter-select"
          >
            <option value="all">Choose a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {formatLabel(cat)}
              </option>
            ))}
          </select>

          <button className="filter-reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

      {/* ----- TITRE CENTRÉ ----- */}
      <h2 className="filter-title">{formatLabel(selectedCat)}</h2>

      {/* ----- PRODUITS FILTRÉS ----- */}
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
    </div>
  );
};

export default FilterProducts;
