import { Router } from "express";
import * as HistorialPlantasController from './historial_plantas.controller.js';
import {requireAuth} from '../../middlewares/auth.middleware.js';

const router = Router();

router.use(requireAuth);
router.post('/', HistorialPlantasController.createHistorialPlantas);
router.get('/:id',HistorialPlantasController.getHistorialPlanta);

export default router;