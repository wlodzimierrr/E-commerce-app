import API from './client'

export const login = async (creaditails) => {
    try {

        const response = await API.post('auth/login', creaditails);

        const { token } = response.data

        localStorage.setItem('token', token);

        API.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        return response.data;
    } catch (err) {
        throw err.response.data;
    }
}

export const register = async (data) => {
    try {

        const response = await API.post('auth/register', data);

        return response.data
    } catch(err) {
        throw err.response.data;
    }
}

export const isLoggedIn = async () => {
    try {
        
        const response = await API.get('auth/logged_in');

        return response.data;
    } catch(err) {
        throw err.response.data;
    }
}
