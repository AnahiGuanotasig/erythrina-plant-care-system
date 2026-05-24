import * as UsersService from './users.service.js'
import jsonwebtoken from 'jsonwebtoken';

export const getUserByEmail = async (req,res) => {
    try{
        const {correo_electronico} = req.params;
        const user = await UsersService.getUserByEmail(correo_electronico);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }
        return res.status(200).json({success: true, data: user});
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const createUser = async (req,res) => {
    try{
        const newUser = await UsersService.createUser(req.body);
        return res.status(201).json({
            success: true,
            data: newUser
        })
    } catch (error){
        return res.status(400).json({
            success: false,
            message: error.message
        });
    };
};

export const loginUser = async(req,res) =>{
    try {
        const user = await UsersService.loginUser(req.body);

        const token = jsonwebtoken.sign(
            {id: user.id, correo_electronico: user.correo_electronico},
            process.env.JWT_SECRET,{expiresIn: '24h'}
        )
        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    };
};