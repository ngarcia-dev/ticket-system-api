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
  const { title, description, internalSecDest, service } = req.body;

  try {
    const ticket = await prisma.ticket.create({
      data: {
        title,
        description,
        authorTicket: {
          create: {
            authorId: req.user.id,
          },
        },
        internalSecDest: {
          connect: {
            id: internalSecDest,
          },
        },
        serviceProvided: {
          connect: {
            id: service,
          },
        },
      },
      include: {
        authorTicket: true,
        serviceProvided: true,
        internalSecDest: true,
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
