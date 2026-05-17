import { Router } from "express";
import * as  PlantasController from "./plantas.controller.js";

const router = Router();

router.post('/',PlantasController.createPlanta);
router.get('/',PlantasController.getAllPlantas);
router.get('/:id',PlantasController.getPlanta);
router.put('/:id', PlantasController.updatePlanta);
router.delete('/:id',PlantasController.deletePlanta);

export default router;