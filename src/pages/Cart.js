import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getCartForUser, removeFromCart } from "../services/cartService";

const Cart = () => {
  const { currentUser } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    getCartForUser(currentUser.email)
      .then((res) => setCartItems(res.data))
      .catch((err) => console.error(err));
  }, [currentUser]);

  const handleRemove = async (recordId) => {
    try {
      await removeFromCart(recordId);
      setCartItems(cartItems.filter((item) => item.id !== recordId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="cart-page">
      <h2>Votre panier</h2>

      {cartItems.length === 0 && <p>Aucun produit dans votre panier.</p>}

      <div className="products-grid">
        {cartItems.map((item) => (
          <div className="product-card" key={item.id}>
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
            <p>{item.price} $</p>
            <button onClick={() => handleRemove(item.id)}>
              Remove from cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
