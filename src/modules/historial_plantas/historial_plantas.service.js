import {z} from "zod";
import * as HistorialPlantasRepository from "./historial_plantas.repository.js";
import * as HistorialPlantasSchema from "./historial_plantas.schema.js";

export const createHistorialPlantas = async (data) =>{
    try{
        const validateData = HistorialPlantasSchema.historialPlantasSchema.parse(data);
        return await HistorialPlantasRepository.createHistorialPlantas(validateData);
    } catch (error) {
        if (error instanceof z.ZodError || error.issues) {
            const listaErrores = error.issues || error.errors || [];
            
            if (listaErrores.length > 0) {
                const mensajes = listaErrores.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
                throw new Error(`Error de validación: ${mensajes}`);
            }
        }
        
        error.message = "Error al crear el historial de la planta: " + error.message;
        throw error;
    }
}

export const getHistorialPlanta = async(id)=>{
    try {
        const planta = await HistorialPlantasRepository.getHistorialPlanta(id);
        if(!planta || planta.length === 0){
            throw new Error("La planta solicitada no existe")
        }
        return planta;
    } catch (error) {
        throw new Error(error.message || "Error al obtener el historial de la planta"); 
    }
}