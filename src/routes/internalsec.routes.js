import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  createInternalsec,
  getInternalsec,
  addUserInternalsec,
} from "../controllers/internalsec.controller.js";

const router = Router();

router.get("/sectorinterno",  authRequired, getInternalsec);
router.post("/sectorinterno",  authRequired, createInternalsec);
router.post("/sectorinterno/usuario",  authRequired, addUserInternalsec);

export default router;
