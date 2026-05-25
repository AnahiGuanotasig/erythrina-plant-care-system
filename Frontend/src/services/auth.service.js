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
        // Conservamos tu manejo de errores para que el componente no se rompa
        return {
            success: false,
            message: error.response?.data?.message || 'Login failed'
        };
    }
};

export const logout = () => {
    localStorage.removeItem('token');
};