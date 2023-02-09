import { Router } from "express";
import { getData, createData, getAllData } from "../controllers/data.controller.js";

const router = Router();


router.get("/data/:sensor", getData);

router.get("/data", getAllData);

router.post("/data", createData);

export default router;