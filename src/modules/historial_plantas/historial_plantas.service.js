import {z} from "zod";
import * as HistorialPlantasRepository from "./historial_plantas.repository.js";

const historialPlantasSchema = z.object({
    id_planta: z.number().int().positive(),
    id_estado: z.number().int().positive(),
    id_tamanio: z.number().int().positive(),
    intervalo_riego_dias: z .number().min(1).optional(),
    observaciones: z.string().optional()
});

export const createHistorialPlantas = async (data) =>{
    try{
        const validateData = historialPlantasSchema.parse(data);
        return await HistorialPlantasRepository.createHistorialPlantas(validateData);
    } catch (error) {
        if (error instanceof z.ZodError) {
            throw new Error(error.errors[0].message);
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