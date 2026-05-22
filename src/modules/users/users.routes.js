import { Router } from "express";
import * as UsersController from './users.controller.js'

const router = Router();

router.post('/',UsersController.createUser);
router.get('/:correo_electronico',UsersController.getUserByEmail);

export default router;