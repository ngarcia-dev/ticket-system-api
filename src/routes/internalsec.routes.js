import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  createInternalsec,
  getInternalsec,
  addUserInternalsec,
} from "../controllers/internalsec.controller.js";

const router = Router();

router.get("/internalsec",  authRequired, getInternalsec);
router.post("/internalsec",  authRequired, createInternalsec);
router.post("/internalsec/user",  authRequired, addUserInternalsec);

export default router;
