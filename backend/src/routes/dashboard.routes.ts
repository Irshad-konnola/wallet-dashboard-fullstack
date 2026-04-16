import { Router } from "express";
import { getChartData } from "../controllers/transaction.controller";

const router = Router();

router.get("/chart", getChartData);

export default router;
