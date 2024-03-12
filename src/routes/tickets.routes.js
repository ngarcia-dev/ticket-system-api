import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getTickets,
  getTicketsInternalSec,
  getAssignedTickets,
  createTicket,
} from "../controllers/tickets.controller.js";

const router = Router();

router.get("/tickets", authRequired, getTickets);

router.get("/tickets/internalsec", authRequired, getTicketsInternalSec);

router.get("/tickets/assigned", authRequired, getAssignedTickets);

router.post("/tickets", authRequired, createTicket);

export default router;
