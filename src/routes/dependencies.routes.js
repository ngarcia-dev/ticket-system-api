import { Router } from "express";
import {
  getDependencies,
  getDependency,
  createDependency,
  updateDependency,
  deleteDependency,
} from "../controllers/dependencies.controller.js";

const router = Router();

router.get("/dependencies", getDependencies);
router.get("/dependencies/:id", getDependency);
router.post("/dependencies", createDependency);
router.put("/dependencies/:id", updateDependency);
router.delete("/dependencies/:id", deleteDependency);

export default router;