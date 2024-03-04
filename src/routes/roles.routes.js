import { Router } from "express";

import { createRole } from "../controllers/roles.controller.js";

const router = Router();

router.post("/roles", createRole);

export default router;
