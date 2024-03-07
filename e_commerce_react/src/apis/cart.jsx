import API from './client';

export const fetchCart = async () => {
  try {
    const response = await API.get(`carts/cart`);

    return response.data;

  } catch (err) {
    throw err.response.data;
  }
}


export const addToCart = async (productId, quantity) => {
  try {
    const response = await API.post(`carts/cart/items`, { productId, quantity });

    return response.data;

  } catch(err) {
    throw err.response.data;
  }
}

export const removeFromCart = async (cartItemId) => {
  try {
    const response = await API.delete(`carts/cart/items/${cartItemId}`);

    return response.data;

  } catch(err) {
    throw err.response.data;
  }
}

export const checkout = async (cartId, paymentInfo) => {
  try {
    const response = await API.post(`carts/${cartId}/checkout`, { cartId, paymentInfo });

    return response.data;

  } catch(err) {
    throw err.response.data;
  }
}