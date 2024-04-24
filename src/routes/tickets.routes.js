import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getTicketsAuthor,
  getTicketsInternalSec,
  getTicketsDependency,
  createTicket,
  assignerTickets,
  getTicketId,
  updateTicket,
  deleteTicket,
} from "../controllers/tickets.controller.js";

const router = Router();

router.get("/tickets", authRequired, getTicketsAuthor);

router.get("/tickets/internalsec", authRequired, getTicketsInternalSec);

router.get("/tickets/dependency", authRequired, getTicketsDependency);

router.get("/tickets/:id", authRequired, getTicketId);

router.post("/tickets", authRequired, createTicket);

router.put("/tickets/:id/assign", authRequired, assignerTickets);

router.patch("/tickets/:id", authRequired, updateTicket);

router.delete("/tickets/:id", authRequired, deleteTicket);

export default router;
