import { Router } from "express";
import { filtarAgua, filtarHumedad, filtarTmpExt, filtarTmpInt, getControlArduino, getHumedad, filtrarEstBomba, manipularBomba, setSensors, onOffBomba } from "../controllers/data.controller.js";

const router = Router();

router.post("/setValues", setSensors);

router.post("/filtroTmpInt", filtarTmpInt);

router.post("/filtroTmpExt", filtarTmpExt);

router.post("/filtarHumedad", filtarHumedad);

router.post("/filtarAgua", filtarAgua);

router.get("/getControlArduino", getControlArduino);

router.get("/getHumedad", getHumedad)

router.post("/manipularBomba", manipularBomba);

router.post("/filtrarEstBomba", filtrarEstBomba)

router.post("/onOffBomba", onOffBomba);

export default router;