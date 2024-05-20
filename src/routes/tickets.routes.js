import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getAllTicketsForUser,
  getTicketsInternalSec,
  getTicketsDependency,
  createTicket,
  assignerTickets,
  getTicketId,
  updateTicket,
  deleteTicket,
} from "../controllers/tickets.controller.js";

const router = Router();

router.get("/tickets", authRequired, getAllTicketsForUser);

router.get("/tickets/internalsec", authRequired, getTicketsInternalSec);

router.get("/tickets/dependency", authRequired, getTicketsDependency);

router.get("/tickets/:ticketId", authRequired, getTicketId);

router.post("/tickets", authRequired, createTicket);

router.put("/tickets/:ticketId/assign", authRequired, assignerTickets);

router.patch("/tickets/:ticketId", authRequired, updateTicket);

router.delete("/tickets/:ticketId", authRequired, deleteTicket);

export default router;
