import API from './client';

export const fetchOrders = async () => {
  try {
    const response = await API.get(`orders`);

    return response.data;

  } catch (err) {
    throw err.response.data;
  }
}

export const fetchOrder = async (orderId) => {
  try {
    const response = await API.get(`orders/${orderId}`);

    return response.data;

  } catch(err) {
    throw err.response.data;
  }
}

  export const fetchOrdersWithSoldItems = async () => {
    try {
      const response = await API.get(`orders/order/with-details`);
      return response.data; 
    } catch (err) {
      console.error("Error fetching orders with detailed sold items:", err);
      throw err.response.data; 
    }
  };
