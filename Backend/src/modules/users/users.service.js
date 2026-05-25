import { z} from "zod";
import bcrypt from "bcrypt";

import * as UsersSchema from './users.schema.js'
import * as UsersRepository from './users.repository.js'


export const getUserByEmail = async(correo_electronico)=>{
    try {
        const user = await UsersRepository.getUserByEmail(correo_electronico);
        return user;
    } catch (error) {
        throw new Error("Error al obtener el usuario: " + error.message);
    }
}


export const createUser = async(data)=>{
    try{
        const validateData = UsersSchema.usersSchema.parse(data);
        
        const usuarioExistente = await getUserByEmail(validateData.correo_electronico);
        if(usuarioExistente){
            throw new Error("El correo electronico ya esta registrado");
        }
        const hash = await bcrypt.hash(validateData.password,10);
        
        const newUser = await UsersRepository.createUsuario({
            correo_electronico: validateData.correo_electronico,
            nombre_usuario:validateData.nombre_usuario,
            password_hash: hash
        })
        return newUser;
    }catch(error){
        if (error instanceof z.ZodError || error.issues) {
            const listaErrores = error.issues || error.errors || [];
            if (listaErrores.length > 0) {
                const mensajes = listaErrores.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
                throw new Error(`Error de validación: ${mensajes}`);
            }
        }
        throw new Error("Error al crear el usuario: " + error.message);
    };
};

export const loginUser = async(credenciales) =>{
    try {
        const validateData = UsersSchema.loginSchema.parse(credenciales);
        const user = await UsersRepository.getUserCrendencialByEmail(validateData.correo_electronico);
        if(!user){
            throw new Error("Correo electronico o contrasenia incorrectos");
        };
        const isPasswordValido = await bcrypt.compare(validateData.password,user.password_hash);
        if(!isPasswordValido){
            throw new Error("Correo electronico o contrasenia incorrectos");
        };
        return{
            id: user.id,
            correo_electronico: user.correo_electronico,
            message: 'Login exitoso'
        };
    } catch (error) {
        if (error instanceof z.ZodError || error.issues) {
            const listaErrores = error.issues || error.errors || [];
            if (listaErrores.length > 0) {
                const mensajes = listaErrores.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
                throw new Error(`Error de validación: ${mensajes}`);
            }
        }
        throw new Error(error.message);
    };
};