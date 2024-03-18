import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getTicketsAuthor,
  getTicketsInternalSec,
  getAssignedTickets,
  createTicket,
} from "../controllers/tickets.controller.js";

const router = Router();

router.get("/tickets", authRequired, getTicketsAuthor);

router.get("/tickets/internalsec", authRequired, getTicketsInternalSec);

router.get("/tickets/assigned", authRequired, getAssignedTickets);

router.post("/tickets", authRequired, createTicket);

export default router;
