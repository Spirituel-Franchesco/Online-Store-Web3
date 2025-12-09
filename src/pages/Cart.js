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
      setCartItems((prev) => prev.filter((item) => item.id !== recordId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="cart-page">
      <h1 className="cart-title">Cart</h1>

      {cartItems.length === 0 && (
        <p className="cart-empty">Aucun produit dans votre panier.</p>
      )}

      <div className="grid-product">
        {cartItems.map((item) => (
          <div className="card-product" key={item.id}>
            <img src={item.image} alt={item.title} />

            <h4 className="cart-item-title">{item.title}</h4>
            <p className="cart-item-price">{item.price} $</p>

            <button
              className="remove-button"
              onClick={() => handleRemove(item.id)}
            >
              Remove from cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
