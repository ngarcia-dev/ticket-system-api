import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getTicketsAuthor,
  getTicketsInternalSec,
  getTicketsDependency,
  createTicket,
  assignTicket,
} from "../controllers/tickets.controller.js";

const router = Router();

router.get("/tickets", authRequired, getTicketsAuthor);

router.get("/tickets/internalsec", authRequired, getTicketsInternalSec);

router.get("/tickets/dependency", authRequired, getTicketsDependency);

router.post("/tickets", authRequired, createTicket);

router.put("/tickets/:ticketId/assign", authRequired, assignTicket);

export default router;
