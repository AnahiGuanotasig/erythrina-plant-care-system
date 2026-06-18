//importo la piscina de conexion del archivo database.js
import { pool } from "../../config/database.js";

export const createPlantas = async ({
    codigo,
    nombre,
    id_tipo,
    id_tamanio,
    id_estado,
    fecha_plantacion,
    intervalo_riego_dias,
    id_usuario
}) => {
    const values = [
        codigo,
        nombre,
        id_tipo,
        id_tamanio,
        id_estado,
        fecha_plantacion,
        intervalo_riego_dias,
        id_usuario
    ];

    const query = `
        INSERT INTO plantas (
            codigo,
            nombre, 
            id_tipo,
            id_tamanio,
            id_estado,
            fecha_plantacion,
            intervalo_riego_dias,
            id_usuario
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
        RETURNING *`;

    const resultado = await pool.query(query, values);
    return resultado.rows[0];
};

export const getAllPlantas = async () => {
    const query = "SELECT * FROM plantas ORDER BY id ASC";
    const resultado = await pool.query(query);
    return resultado.rows; // Retornamos el array completo de filas
};

export const getPlantasByUser = async (id_usuario) => {
    const query = `SELECT 
    p.id,
    p.codigo,
    p.nombre AS nombre_planta,
    pt.tipo AS tipo_planta,
    ptam.tamanio AS tamanio_planta,
    e.estado AS estado_actual,
    p.fecha_plantacion,
    p.intervalo_riego_dias,
    u.nombre_usuario AS cuidador
    FROM plantas p
    JOIN plantas_tipos pt ON p.id_tipo = pt.id
    JOIN plantas_tamanios ptam ON p.id_tamanio = ptam.id
    JOIN estados e ON p.id_estado = e.id
    JOIN usuarios u ON p.id_usuario = u.id
    WHERE p.id_usuario = $1
    ORDER BY p.id ASC;`;
    const values = [id_usuario];
    const resultado = await pool.query(query, values);
    return resultado.rows; 
};

export const getPlanta = async (id) => {
    const query = "SELECT * FROM plantas WHERE id = $1";
    const values = [id];

    const resultado = await pool.query(query, values);
    return resultado.rows[0]; // Retornamos solo la planta encontrada
};

export const updatePlanta = async (id, camposActualizados) => {
    const query = `
        UPDATE plantas 
        SET nombre = COALESCE($1, nombre), 
            id_estado = COALESCE($2, id_estado), 
            id_tamanio = COALESCE($3, id_tamanio), 
            intervalo_riego_dias = COALESCE($4, intervalo_riego_dias)
        WHERE id = $5 
        RETURNING *;`;

    const values = [
        camposActualizados.nombre ?? null,
        camposActualizados.id_estado ?? null,
        camposActualizados.id_tamanio ?? null,
        camposActualizados.intervalo_riego_dias ?? null,
        id
    ];

    const resultado = await pool.query(query, values);
    return resultado.rows[0];
};

export const deletePlanta = async (id) => {
    const query = "DELETE FROM plantas WHERE id = $1 RETURNING *";
    const values = [id];

    const resultado = await pool.query(query, values);
    return resultado.rows[0];
};

export const getPlantasTipos = async() =>{
    const query = "SELECT * FROM plantas_tipos ORDER BY id ASC";
    const resultado = await pool.query(query);
    return resultado.rows; 
}   