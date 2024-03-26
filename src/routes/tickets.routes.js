import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getTicketsAuthor,
  getTicketsInternalSec,
  getTicketsDependency,
  createTicket,
  assignerTickets,
  getTicketId,
} from "../controllers/tickets.controller.js";

const router = Router();

router.get("/tickets", authRequired, getTicketsAuthor);

router.get("/tickets/internalsec", authRequired, getTicketsInternalSec);

router.get("/tickets/dependency", authRequired, getTicketsDependency);

router.post("/tickets", authRequired, createTicket);

router.put("/tickets/:ticketId/assign", authRequired, assignerTickets);

router.get("/tickets/:ticketId", authRequired, getTicketId);

export default router;
