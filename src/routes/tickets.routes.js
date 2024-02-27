import { Router } from "express";
import {
  getTickets,
  getTicketsInternalSec,
  getAssignedTickets,
} from "../controllers/tickets.controller.js";

const router = Router();

router.get("/tickets", getTickets);

router.get("/internalsec/:id", getTicketsInternalSec);

router.get("/assignedtickets/:id", getAssignedTickets);

export default router;
