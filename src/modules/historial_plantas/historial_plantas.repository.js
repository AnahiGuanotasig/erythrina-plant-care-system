import { id } from "zod/locales";
import { pool } from "../../config/database.js";

export const createHistorialPlantas = async({
    id_planta,
    id_estado,
    id_tamanio,
    intervalo_riego_dias,
    observaciones,
}) => {
    const values = [
        id_planta,
        id_estado,
        id_tamanio,
        intervalo_riego_dias,
        observaciones
    ]

    const query = `
        INSERT INTO historial_plantas (
            id_planta,id_estado, id_tamanio, intervalo_riego_dias, observaciones)
            VALUES ($1,$2,$3,$4,$5) RETURNING *;
        `;
    
    const resultado = await pool.query(query,values);
    return resultado.rows[0];
};

export const getHistorialPlanta = async (id) =>{
    const query = `
        SELECT 
            h.id,
            h.fecha_registro,
            e.estado as estado_nombre,
            t.tamanio as tamanio_nombre,
            h.intervalo_riego_dias,
            h.observaciones
        FROM historial_plantas h
        JOIN estados e ON h.id_estado = e.id
        JOIN plantas_tamanios t ON h.id_tamanio = t.id
        WHERE h.id_planta = $1
        ORDER BY h.fecha_registro DESC
    `;
    const values = [id];

    const resultado = await pool.query(query,values);

    return resultado.rows;
};