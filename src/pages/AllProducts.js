import React, { useEffect, useState } from "react";
import { fetchAllProducts } from "../services/API";
import { Link } from "react-router-dom";

import Slider from "react-slick";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    fetchAllProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // nb de produits visibles
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // écrans moyens
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // tablettes
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // mobiles
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="all-products-page">
      <h2>Tous les produits</h2>

      {/* Boutons pour choisir la vue */}
      <div className="view-toggle">
        <button
          className={viewMode === "grid" ? "active" : ""}
          onClick={() => setViewMode("grid")}
        >
          Vue grille
        </button>

        <button
          className={viewMode === "carousel" ? "active" : ""}
          onClick={() => setViewMode("carousel")}
        >
          Vue carrousel
        </button>
      </div>

      {/* Vue GRID (flex) */}
      {viewMode === "grid" && (
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
      )}

      {/* Vue CAROUSEL (slider) */}
      {viewMode === "carousel" && (
        <div className="products-carousel">
          <Slider {...sliderSettings}>
            {products.map((product) => (
              <div className="product-card" key={product.id}>
                <img src={product.image} alt={product.title} />
                <h4>{product.title}</h4>
                <p>{product.price} $</p>

                <Link to={`/product/${product.id}`}>
                  <button>View Item</button>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
