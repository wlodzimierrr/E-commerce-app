import API from './client';


export const fetchUser = async (userId) => {
  try {
    const response = await API.post(`users/${userId}`);

    return response.data;

  } catch (err) {
    throw err.response.data;
  }
}

export const updateUser = async (userId) => {
  try {
    const response = await API.post(`users/${userId}`, data);

    return response.data;

  } catch(err) {
    throw err.response.data;
  }
}