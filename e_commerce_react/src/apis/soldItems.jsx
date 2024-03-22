import API from './client';

export const fetchSoldItems = async (order_id) => {
    try {
        const response = await API.get(`solditems/${order_id}`);

        return response.data;
    } catch (err) {
        throw err.response.data;
    }
}