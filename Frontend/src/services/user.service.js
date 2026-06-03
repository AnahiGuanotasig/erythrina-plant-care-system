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

export const getUserCredentialByEmail = async(correo_electronico) =>{
    try{
        const response = await API.post('users/credential', { correo_electronico });
        return response.data.data;
    }catch(error){
        console.error('Error fetching user credentials:', error);
        throw error;
    }
}