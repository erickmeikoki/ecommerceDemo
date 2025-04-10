import axios from "axios";

const API_BASE_URL = "https://fakestoreapi.com";

export interface Review {
  id: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  reviews: Review[];
}

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  // Get all products
  getProducts: async () => {
    await delay(500); // Simulate network delay
    const response = await axios.get<Product[]>(`${API_BASE_URL}/products`);
    return response.data;
  },

  // Get a single product by ID
  getProduct: async (id: string) => {
    await delay(500);
    const response = await axios.get<Product>(`${API_BASE_URL}/products/${id}`);
    return response.data;
  },

  // Get featured products (first 3 products)
  getFeaturedProducts: async () => {
    await delay(500);
    const response = await axios.get<Product[]>(
      `${API_BASE_URL}/products?limit=3`
    );
    return response.data;
  },

  // Get products by category
  getProductsByCategory: async (category: string) => {
    await delay(500);
    const response = await axios.get<Product[]>(
      `${API_BASE_URL}/products/category/${category}`
    );
    return response.data;
  },

  // Get all categories
  getCategories: async () => {
    await delay(500);
    const response = await axios.get<string[]>(
      `${API_BASE_URL}/products/categories`
    );
    return response.data;
  },

  // Simulate order placement
  placeOrder: async (orderData: {
    items: Array<{ id: string; quantity: number }>;
    total: number;
    customerInfo: {
      name: string;
      email: string;
      address: string;
    };
  }) => {
    await delay(1000);
    // In a real application, this would send the order to a backend
    return {
      success: true,
      orderId: `ORD-${Math.random().toString(36).substr(2, 9)}`,
      ...orderData,
    };
  },
};
