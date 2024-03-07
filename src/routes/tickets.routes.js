import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getTickets,
  getTicketsInternalSec,
  getAssignedTickets,
  createTicket,
} from "../controllers/tickets.controller.js";

const router = Router();

router.get("/tickets",  authRequired, getTickets);

router.get("/internalsec/:id",  authRequired, getTicketsInternalSec);

router.get("/assignedtickets/:id",  authRequired, getAssignedTickets);

router.post("/createticket", authRequired, createTicket);

export default router;
