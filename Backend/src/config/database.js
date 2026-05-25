import PG from "pg";
import dotenv from "dotenv";

//lector de las variables de entorno
dotenv.config();

//Pool de conexiones
export const pool = new PG.Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

//Compuebo la conexion
pool.connect()
    .then(client => {
        console.log("Conectado a PostgreSQL");
        client.release();
    })
    .catch(err => {
        console.error("Error conectando a PostgreSQL:", err.message);
    });
