import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "../services/API";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductDetails(id)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product details:", err));
  }, [id]);

  if (!product) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="product-details-page">
      <h2>{product.title}</h2>

      <div className="product-details-content">
        <img src={product.image} alt={product.title} />

        <div className="product-details-info">
          <p>
            <strong>Prix :</strong> {product.price} $
          </p>
          <p>
            <strong>Catégorie :</strong> {product.category}
          </p>
          <p>
            <strong>Description :</strong>
          </p>
          <p>{product.description}</p>

          <button>Ajouter au panier</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
