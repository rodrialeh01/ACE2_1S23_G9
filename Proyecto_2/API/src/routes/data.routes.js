import { Router } from "express";
import { filtarHumedad, filtarTmpExt, filtarTmpInt, setSensors } from "../controllers/data.controller.js";

const router = Router();

router.post("/setValues", setSensors);

router.post("/filtroTmpInt", filtarTmpInt);

router.post("/filtroTmpExt", filtarTmpExt);

router.post("/filtarHumedad", filtarHumedad);

export default router;