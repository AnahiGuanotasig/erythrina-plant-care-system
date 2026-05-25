import API from './api';

export const getAllPlants = async () => {
    const response = await API.get('/plantas');
    return response.data;
};

export const createPlanta = async (plantData) => {
    const response = await API.post('/plantas', plantData);
    return response.data;
};