import { Router } from "express";
import {
  createInternalsec,
  getInternalsec,
  addUserInternalsec,
} from "../controllers/internalsec.controller.js";

const router = Router();

router.get("/sectorinterno", getInternalsec);
router.post("/sectorinterno", createInternalsec);
router.post("/sectorinterno/usuario", addUserInternalsec);

export default router;
