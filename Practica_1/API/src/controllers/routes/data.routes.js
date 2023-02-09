import { Router } from "express";
import { getData, createData } from "../controllers/data.controller.js";

const router = Router();


router.get("/data/:sensor", getData);

router.post("/data", createData);

export default router;