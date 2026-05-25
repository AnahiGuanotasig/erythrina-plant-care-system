import {z} from 'zod';

export const historialPlantasSchema = z.object({
    id_planta: z.number().int().positive(),
    id_estado: z.number().int().positive(),
    id_tamanio: z.number().int().positive(),
    intervalo_riego_dias: z .number().min(1).optional(),
    observaciones: z.string().optional()
});