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
      <h2>Filtrer les produits par catégorie</h2>

      <div className="filter-controls">
        <select value={selectedCat} onChange={handleCategoryChange}>
          <option value="all">Toutes les catégories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button onClick={handleReset}>Reset</button>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <h4>{product.title}</h4>
            <p>{product.price} $</p>
            <Link to={`/product/${product.id}`}>
              <button>View item</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterProducts;
