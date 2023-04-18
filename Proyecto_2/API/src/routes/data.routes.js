import { Router } from "express";
import { setSensors } from "../controllers/data.controller.js";

const router = Router();

router.post("/setValues", setSensors);

export default router;