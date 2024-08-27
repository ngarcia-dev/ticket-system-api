import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getDependencies,
  getDependency,
  createDependency,
  updateDependency,
  deleteDependency,
} from "../controllers/dependencies.js";

const router = Router();

router.get("/dependencies", authRequired, getDependencies);
router.get("/dependencies/:id", authRequired, getDependency);
router.post("/dependencies", authRequired, createDependency);
router.put("/dependencies/:id", authRequired, updateDependency);
router.delete("/dependencies/:id", authRequired, deleteDependency);

export default router;
