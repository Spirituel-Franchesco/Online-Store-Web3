import axios from "axios";

const API_URL = "https://fakestoreapi.com";

export const fetchAllProducts = () => {
  return axios.get(`${API_URL}/products`);
};

export const fetchCategories = () => {
  return axios.get(`${API_URL}/products/categories`);
};

export const fetchProductsByCategory = (category) => {
  return axios.get(`${API_URL}/products/category/${category}`);
};

export const fetchProductDetails = (id) => {
  return axios.get(`${API_URL}/products/${id}`);
};
