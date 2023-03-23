import { Router } from "express";
import { configTiempoTrabajo, configurarPomodoro, dataPomodoro, getLastId, getLastTime, updateConfig, updateConfig2, updateLogin, getLogin, updateConfigTime, simulate } from "../controllers/data.controller.js";

const router = Router();

router.post("/confPD", configurarPomodoro);

router.post("/dataPomodoro", dataPomodoro);

router.get("/getLastId", getLastId);

router.get("/getLastTime/:id", getLastTime);

router.put("/updateConfig", updateConfig);

router.put("/updateConfig2", updateConfig2);

router.get("/config/trabajo/:t", configTiempoTrabajo);

router.put("/updateLogin", updateLogin);

router.get("/getLogin", getLogin);

router.put("/updateConfigTime", updateConfigTime);

router.get("/simulate", simulate);
// router.get("/data", getAllData);

export default router;