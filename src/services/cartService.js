import axios from "axios";

const CART_URL = "http://localhost:3001/cart";

// Tous les items du panier pour un utilisateur
export const getCartForUser = (emailUser) => {
  return axios.get(`${CART_URL}?emailUser=${encodeURIComponent(emailUser)}`);
};

// Vérifier si un produit est déjà dans le panier de cet utilisateur
export const getCartItemForUserAndProduct = (emailUser, productId) => {
  return axios.get(
    `${CART_URL}?emailUser=${encodeURIComponent(emailUser)}&productId=${productId}`
  );
};

// Ajouter au panier
export const addToCart = (item) => {
  return axios.post(CART_URL, item);
};

// Supprimer du panier (par id du record JSON Server)
export const removeFromCart = (id) => {
  return axios.delete(`${CART_URL}/${id}`);
};
