import { z } from 'zod';
import * as PlantasRepository from "./plantas.repository"

//Contrato para la validacion de datos
const plantaSchema = z.object({
    codigo: z.string().min(1, "El código es obligatorio"),
    nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    id_tipo: z.number().int().positive("El tipo de planta es obligatorio"),
    id_tamanio: z.number().int().positive("El tamaño es obligatorio"),
    id_estado: z.number().int().positive("El estado es obligatorio"),
    fecha_plantacion: z.string().optional().nullable(),
    intervalo_riego_dias: z.number().min(1, "El intervalo debe ser al menos 1 día"),
    id_usuario: z.number().int().positive("El ID de usuario es obligatorio")
});

export const createPlantas = async(data) =>{
    try{
        const validateData = plantaSchema.parse(data);
        return await PlantasRepository.createPlantas(validateData);
    } catch (error) {
        if (error instanceof z.ZodError) {
            throw new Error(error.errors[0].message);
        }
        throw new Error("Error al crear la planta: " + error.message);
    }
};

export const getAllPlantas = async() =>{
    try {
        return await PlantasRepository.getAllPlantas();
    } catch (error) {
        throw new Error ("Error al obtener las plantas")
    }
};

export const getPlanta = async(id) => {
    try {
        const planta = await PlantasRepository.getPlanta(id);
        if (!planta) {
            throw new Error("La planta solicitada no existe");
        }
        return planta;
    } catch (error) {
        throw new Error(error.message || "Error al obtener la planta");
    }
};

export const updatePlanta = async(id, camposActualizados) =>{
    try {
        const updateSchema = plantaSchema.partial();
        const validateData = updateSchema.parse(camposActualizados);

        return await PlantasRepository.updatePlanta(id,validateData);
    } catch (error) {
        if (error instanceof z.ZodError) {
            throw new Error(error.errors[0].message);
        }
        throw error;
    }
};

export const deletePlanta = async(id) =>{
    try{
        return await PlantasRepository.deletePlanta(id);
    }catch (error) {
        throw new Error ("Error al eliminar la planta")
    };
};