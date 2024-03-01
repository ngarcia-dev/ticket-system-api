import { Router } from "express";
import {
  createServices,
  getServices,
} from "../controllers/services.controller.js";

const router = Router();

router.post("/servicios", createServices);
router.get("/servicios", getServices);

export default router;
