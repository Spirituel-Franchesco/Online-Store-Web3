import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { fetchProductDetails } from "../services/API";
import { AuthContext } from "../context/AuthContext";
import {
  addToCart,
  getCartItemForUserAndProduct,
} from "../services/cartService";

const ProductDetails = () => {
  const { id } = useParams();
  const history = useHistory();
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
      {/* lien back en haut à gauche */}
      <button className="product-back" onClick={() => history.goBack()}>
        Back
      </button>

      <div className="product-details-content">
        {/* IMAGE À GAUCHE */}
        <div className="product-details-image">
          <img src={product.image} alt={product.title} />
        </div>

        {/* PANNEAU BLANC À DROITE */}
        <div className="product-details-panel">
          <h1 className="product-title">{product.title}</h1>

          <p className="product-category">{product.category}</p>

          <div className="product-meta-row">
            <div className="price-box">{product.price} $</div>
            <div className="rating-box">☆☆☆☆☆</div>
          </div>

          <p className="product-descriptionn">{product.description}</p>

          {message && <p className="product-message">{message}</p>}

          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
