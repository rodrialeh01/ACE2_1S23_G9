import { Router } from "express";
import { configTiempoTrabajo, configurarPomodoro, dataPomodoro, getLastId, getLastTime, updateConfig, updateConfig2, updateLogin, getLogin, updateConfigTime, simulate, simulate2, getConfigTime, getWorkTime, getFreeTime, resetTime, getFase, updateIdPomodoro, totalPomodorosSinFiltro, filtrarUsuariosPorFecha, filtrarDataPorUsuario, totalPomodorosConFiltro, filtrarDataPorIdPomodoro, rankingIndividual, filtrarDataPorUsuarioIdPomodoro } from "../controllers/data.controller.js";

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

router.post("/updateConfigTime", updateConfigTime);

router.get("/getConfigTime", getConfigTime);

router.get("/simulate", simulate);

router.get("/simulate2", simulate2);

router.get("/getWorkTime", getWorkTime);

router.get("/getFreeTime", getFreeTime);

router.get("/reset", resetTime);

router.get("/getFase", getFase);

router.get("/updateIdPomodoro", updateIdPomodoro);

router.post("/filtarUsariosFecha", filtrarUsuariosPorFecha);

router.get("/filtrarDataPorUsuario/:id", filtrarDataPorUsuario);

router.get("/ranking1/:id", totalPomodorosSinFiltro);

router.get("/ranking2/:id/:id2", totalPomodorosConFiltro);

router.get("/filtrarDataPorIdPomodoro/:id", filtrarDataPorIdPomodoro);

router.get("/rankingActual", rankingIndividual);

router.get("/filtrarDataPorUsuarioIdPm/:id/:idPm", filtrarDataPorUsuarioIdPomodoro);
// router.get("/data", getAllData);

export default router;