import { z } from 'zod';
import * as PlantasRepository from "./plantas.repository.js";
import * as PlantaSchema from './plantas.schema.js';


export const createPlantas = async(data) =>{
    try{
        const validateData = PlantaSchema.plantaSchema.parse(data);
        return await PlantasRepository.createPlantas(validateData);
    } catch (error) {
        if (error instanceof z.ZodError || error.issues) {
            const listaErrores = error.issues || error.errors || [];
            if (listaErrores.length > 0) {
                const mensajes = listaErrores.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
                throw new Error(`Error de validación: ${mensajes}`);
            }
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
        const updateSchema = PlantaSchema.plantaSchema.partial();
        const validateData = updateSchema.parse(camposActualizados);

        return await PlantasRepository.updatePlanta(id,validateData);
    } catch (error) {
        if (error instanceof z.ZodError || error.issues) {
            const listaErrores = error.issues || error.errors || [];
            if (listaErrores.length > 0) {
                const mensajes = listaErrores.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
                throw new Error(`Error de validación: ${mensajes}`);
            }
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