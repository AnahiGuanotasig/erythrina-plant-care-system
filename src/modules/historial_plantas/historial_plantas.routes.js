import { Router } from "express";
import * as HistorialPlantasController from './historial_plantas.controller.js';

const router = Router();

router.post('/', HistorialPlantasController.createHistorialPlantas);
router.get('/:id',HistorialPlantasController.getHistorialPlanta);

export default router;