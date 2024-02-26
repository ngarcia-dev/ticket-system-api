import { Router } from "express";
import { prisma } from "../db.js";

const router = Router();

router.get("/tickets/:id", async (req, res) => {
  try {
    const tickets = await prisma.tickets.findFirst({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        internalSec: true,
        service: true,
      },
    });
    res.json(tickets);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while trying to fetch tickets" });
  }
});

export default router;
