import * as HistorialPlantasService from './historial_plantas.service.js';

export const createHistorialPlantas = async (req, res) => {
    try {
        const nuevoRegistro = await HistorialPlantasService.createHistorialPlantas(req.body);
        return res.status(201).json({
            success: true,
            data: nuevoRegistro
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    };
};

export const getHistorialPlanta = async (req, res) => {
    try {
        const {id} = req.params;
        const historialPlanta = await HistorialPlantasService.getHistorialPlanta(id);
        return res.status(200).json({
            success: true,
            data: historialPlanta
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message
        });
    };
};