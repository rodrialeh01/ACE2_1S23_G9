import { Router } from "express";
import { configurarPomodoro, dataPomodoro, getLastId, getLastTime, updateConfig, updateConfig2 } from "../controllers/data.controller.js";

const router = Router();

router.post("/confPD", configurarPomodoro);

router.post("/dataPomodoro", dataPomodoro);

router.get("/getLastId", getLastId);

router.get("/getLastTime/:id", getLastTime);

router.put("/updateConfig", updateConfig);

router.put("/updateConfig2", updateConfig2);

// router.get("/data/:sensor", getData);

// router.get("/data", getAllData);

export default router;