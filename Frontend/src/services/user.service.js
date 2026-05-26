import API from "./api";

export const createUser = async(nombre_usuario, correo_electronico, password) => {
    try {
        const response = await API.post('users', {correo_electronico, nombre_usuario, password });
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};