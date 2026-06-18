import API from './api';

export const getAllPlants = async () => {
    const response = await API.get('/plantas');
    return response.data.data;
};

export const createPlanta = async (plantData) => {
    const response = await API.post('/plantas', plantData);
    return response.data.data;
};

export const getPlanta = async(id)=>{
    const response  = await API.get('/plantas/'+id);
    return response.data.data;
} 

export const getPlantasByUser = async (id_usuario) => {
    const response = await API.get(`/plantas/user/${id_usuario}`);
    return response.data.data;
};


export const plantasTipos = async() =>{
    const response = await API.get('/plantas/tipos');
    return response.data.data;
}