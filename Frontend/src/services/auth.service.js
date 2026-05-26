import API from "./api";

export const login = async (correo_electronico, password) => {
    try {
        const response = await API.post('users/login', { correo_electronico, password });

        if (response.data.success && response.data.token) {
            localStorage.setItem('token', response.data.token);
        }

        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Contraseña o correo electrónico incorrectos'
        };
    }
};

export const logout = () => {
    localStorage.removeItem('token');
};