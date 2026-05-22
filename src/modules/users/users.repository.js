import { core } from "zod";
import { pool } from "../../config/database.js";

export const getUserByEmail = async(correo_electronico)=>{
    const query = `
    SELECT id,correo_electronico,nombre_usuario
    FROM usuarios
    WHERE correo_electronico = $1
    `
    const resultado = await pool.query(query,[correo_electronico]);
    return resultado.rows[0];
}

export const createUsuario = async ({
    correo_electronico,
    nombre_usuario,
    password_hash
}) =>{
    const values = [
        correo_electronico,
        nombre_usuario,
        password_hash
    ]
    const query =  `
        INSERT INTO usuarios (
            correo_electronico,
            nombre_usuario,
            password_hash
        ) VALUES ($1,$2,$3)
        RETURNING id,correo_electronico,nombre_usuario;
    `;
    
    const resultado = await pool.query(query, values);
    return resultado.rows[0];
}
