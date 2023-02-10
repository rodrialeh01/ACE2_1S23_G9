import { Router } from "express";
import { getData, createData, getAllData, pushData } from "../controllers/data.controller.js";

const router = Router();


router.get("/data/:sensor", getData);

router.get("/data", getAllData);

router.post("/data", createData);

router.post("/datas", pushData);

export default router;