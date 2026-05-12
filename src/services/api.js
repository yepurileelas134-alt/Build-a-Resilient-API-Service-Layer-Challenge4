import axios from 'axios';

// Create an axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://fakestoreapi.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach authentication token automatically
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Global error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 401) {
        console.warn('Global 401 handler triggered: Unauthorized access');
        // Handle unauthorized (e.g., redirect to login, clear local storage)
      } else if (error.response.status === 403) {
        console.warn('Global 403 handler triggered: Forbidden');
      } else if (error.response.status >= 500) {
        console.warn('Global 5xx handler triggered: Server Error');
      }
    }
    return Promise.reject(error);
  }
);

// Named service functions for each API endpoint

export const getProducts = async () => {
  const response = await apiClient.get('/products');
  return response.data;
};

export const getProductById = async (id) => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};

export const getProductsByCategory = async (category) => {
  const response = await apiClient.get(`/products/category/${category}`);
  return response.data;
};

export const getCategories = async () => {
  const response = await apiClient.get('/products/categories');
  return response.data;
};

export const getCart = async (userId) => {
  const response = await apiClient.get(`/carts/user/${userId}`);
  return response.data;
};

export const addToCart = async (cartData) => {
  const response = await apiClient.post('/carts', cartData);
  return response.data;
};

export const updateCart = async (cartId, cartData) => {
  const response = await apiClient.put(`/carts/${cartId}`, cartData);
  return response.data;
};

export const deleteCart = async (cartId) => {
  const response = await apiClient.delete(`/carts/${cartId}`);
  return response.data;
};

export const getUser = async (userId) => {
  const response = await apiClient.get(`/users/${userId}`);
  return response.data;
};

export const updateUser = async (userId, userData) => {
  const response = await apiClient.put(`/users/${userId}`, userData);
  return response.data;
};

export const submitReview = async (reviewData) => {
  const response = await apiClient.post('/users', reviewData);
  return response.data;
};

export default apiClient;
