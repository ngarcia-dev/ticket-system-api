import { prisma } from "../db.js";

/**
 * Retrieves all tickets for a specific user.
 */
export const getTickets = async (req, res) => {
  const userId = req.user.id;

  try {
    const tickets = await prisma.ticket.findMany({
      where: {
        authorTicket: {
          every: {
            authorId: userId,
          },
        },
      },
      include: {
        authorTicket: true,
      },
    });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTicket = async (req, res) => {
  const { title, description, internalSecDest, serviceId } = req.body;

  try {
    const internalSec = await prisma.internalSec.findUnique({
      where: {
        id: internalSecDest,
      },
      include: {
        service: true,
      },
    });

    if (!internalSec)
      return res.status(404).json({ error: "InternalSec not found" });

    const service = internalSec.service.find(
      (service) => service.id === serviceId
    );

    if (!service) return res.status(404).json({ error: "Service not found" });

    const ticket = await prisma.ticket.create({
      data: {
        title,
        description,
        authorTicket: {
          create: {
            authorId: req.user.id,
          },
        },
        internalSecDestId: internalSecDest,
        serviceProvidedId: serviceId,
      },
      include: {
        authorTicket: true,
      },
    });

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves internal sector tickets with associated users and services.
 */
export const getTicketsInternalSec = async (req, res) => {};

/**
 * Retrieves the assigned tickets for a specific user.
 */
export const getAssignedTickets = async (req, res) => {};
