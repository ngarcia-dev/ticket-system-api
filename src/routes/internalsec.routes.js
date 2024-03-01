import { Router } from "express";
import {
  createInternalsec,
  getInternalsec,
} from "../controllers/internalsec.controller.js";

const router = Router();

router.post("/sectorinterno", createInternalsec);
router.get("/sectorinterno", getInternalsec);

export default router;
