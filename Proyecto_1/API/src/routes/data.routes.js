import { Router } from "express";
import { configurarPomodoro, dataPomodoro, getLastId, updateConfig } from "../controllers/data.controller.js";

const router = Router();

router.post("/confPD", configurarPomodoro);

router.post("/dataPomodoro", dataPomodoro);

router.get("/getLastId", getLastId);

router.patch("/updateConfig", updateConfig);

// router.get("/data/:sensor", getData);

// router.get("/data", getAllData);

export default router;