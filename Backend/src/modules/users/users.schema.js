import z from "zod";

export const usersSchema = z.object({
    correo_electronico: z.string().email('El correo electronico no es valido'),
    nombre_usuario: z.string().min(5,'El nombre de usuario debe tener al menos 5 caracteres'),
    password: z.string().min(8,'La contrasenia debe tener al menos 8 caracteres')
});

export const loginSchema = z.object ({
    correo_electronico : z.string().email('El correo electronico no es valido'),
    password:z.string().min(1,'La contrasenia no puede estar vacia')
})