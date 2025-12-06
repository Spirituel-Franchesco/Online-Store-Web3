import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "../services/API";
import { AuthContext } from "../context/AuthContext";
import {
  addToCart,
  getCartItemForUserAndProduct,
} from "../services/cartService";

const ProductDetails = () => {
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProductDetails(id)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product details:", err));
  }, [id]);

  if (!product) {
    return <p>Chargement...</p>;
  }

  const handleAddToCart = async () => {
    if (!currentUser || !product) return;

    setMessage("");

    try {
      // Vérifier si déjà dans le panier
      const existing = await getCartItemForUserAndProduct(
        currentUser.email,
        product.id
      );

      if (existing.data.length > 0) {
        setMessage("Ce produit est déjà dans votre panier.");
        return;
      }

      const item = {
        emailUser: currentUser.email,
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      };

      await addToCart(item);
      setMessage("Produit ajouté au panier !");
    } catch (err) {
      console.error(err);
      setMessage("Erreur lors de l'ajout au panier.");
    }
  };

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

          {message && <p>{message}</p>}

          <button onClick={handleAddToCart}>Ajouter au panier</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
