import React, { useEffect, useState, useRef } from "react";
import { fetchAllProducts } from "../services/API";
import { Link, useLocation } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const location = useLocation();
  const carouselRef = useRef(null);

  useEffect(() => {
    fetchAllProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // lire ?view=grid|carousel
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const view = params.get("view");
    if (view === "carousel" || view === "grid") {
      setViewMode(view);
    } else {
      setViewMode("grid");
    }
  }, [location.search]);

  const scrollCarousel = (direction) => {
    if (!carouselRef.current) return;

    const scrollAmount = 400; // px à faire défiler
    const delta = direction === "left" ? -scrollAmount : scrollAmount;

    carouselRef.current.scrollBy({
      left: delta,
      behavior: "smooth",
    });
  };

  return (
    <div className="all-products-page">
      {/* Vue GRID */}
      {viewMode === "grid" && (
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

      {/* Vue CAROUSEL */}
      {viewMode === "carousel" && (
        <div className="carousel-wrapper">
          <button
            className="carousel-arrow left"
            onClick={() => scrollCarousel("left")}
          >
            &#10094;
          </button>

          <div className="carousel-scroll" ref={carouselRef}>
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

          <button
            className="carousel-arrow right"
            onClick={() => scrollCarousel("right")}
          >
            &#10095;
          </button>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
