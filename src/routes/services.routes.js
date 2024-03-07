import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  createServices,
  getServices,
} from "../controllers/services.controller.js";

const router = Router();

router.post("/servicios", authRequired, createServices);
router.get("/servicios", authRequired, getServices);

export default router;
