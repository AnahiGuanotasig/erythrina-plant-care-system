import {z} from 'zod';


export const plantaSchema = z.object({
    codigo: z.string().min(1,'El codigo es obligatorio'),
    nombre: z.string().min(3,'El nombre debe tener al menos 3 caracteres'),
    id_tipo: z.number().int().positive("El valor tipo debe ser positivo"),
    id_tamanio: z.number().int().positive("El valor tamanio debe ser positivo"),
    id_estado: z.number().int().positive("El valor estado debe ser positivo"),
    fecha_plantacion: z.string().optional().nullable(),
    intervalo_riego_dias : z.number().int().min(1,"El intervalo de dias debe ser minimo 1"),
    id_usuario: z.number().int().positive("El ID del usuario es obligatorio")
});
