import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  createServices,
  getServices,
} from "../controllers/services.controller.js";

const router = Router();

router.post("/services", authRequired, createServices);
router.get("/services", authRequired, getServices);

export default router;
