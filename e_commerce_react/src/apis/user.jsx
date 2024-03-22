import API from './client';


export const fetchUser = async (userId) => {
  try {
    
    const response = await API.get(`users/${userId}`);

    return response.data;

  } catch (err) {
    throw err.response.data;
  }
}

export const updateUser = async (userId, data) => {
  try {
    const response = await API.put(`users/${userId}`, data);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};