import { Router } from "express";
import { filtarAgua, filtarHumedad, filtarTmpExt, filtarTmpInt, getControl, setControlApk, setSensors } from "../controllers/data.controller.js";

const router = Router();

router.post("/setValues", setSensors);

router.post("/filtroTmpInt", filtarTmpInt);

router.post("/filtroTmpExt", filtarTmpExt);

router.post("/filtarHumedad", filtarHumedad);

router.post("/filtarAgua", filtarAgua);

router.get("/getControl", getControl);

router.post("/setControlApk", setControlApk);

export default router;