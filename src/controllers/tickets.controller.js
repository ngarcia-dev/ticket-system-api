import { prisma } from "../db.js";

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
 * Retrieves all tickets for a specific user.
 */
export const getTicketsAuthor = async (req, res) => {
  const { id } = req.user;

  try {
    const tickets = await prisma.ticket.findMany({
      where: {
        authorTicket: {
          every: {
            authorId: id,
          },
        },
      },
      include: {
        authorTicket: {
          select: {
            authorId: true,
          },
        },
      },
    });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves internal sector tickets with associated users and services.
 */
export const getTicketsInternalSec = async (req, res) => {
  const { internalSec } = req.user;

  try {
    const tickets = await prisma.ticket.findMany({
      where: {
        internalSecDestId: internalSec,
      },
      include: {
        authorTicket: {
          select: {
            authorId: true,
          },
        },
      },
    });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieves dependency tickets
 */
export const getTicketsDependency = async (req, res) => {};
