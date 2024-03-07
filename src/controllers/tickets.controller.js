import { prisma } from "../db.js";

/**
 * Retrieves all tickets from the database.
 */
export const getTickets = async (req, res) => {
  try {
    const tickets = await prisma.tickets.findMany();

    console.log(tickets);
    res.json(tickets);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while trying to fetch tickets" });
  }
};

/**
 * Retrieves internal sector tickets with associated users and services.
 */
export const getTicketsInternalSec = async (req, res) => {
  try {
    const ticketsInternalsec = await prisma.internalSec.findFirst({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        tickets: {
          include: {
            UsersTickets: {
              include: {
                user: true,
              },
            },
            service: true,
          },
        },
      },
    });

    console.log(ticketsInternalsec);
    res.json(ticketsInternalsec);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while trying to fetch tickets" });
  }
};

/**
 * Retrieves the assigned tickets for a specific user.
 */
export const getAssignedTickets = async (req, res) => {
  try {
    const tickets = await prisma.usersTickets.findMany({
      where: {
        userId: parseInt(req.params.id),
      },
      include: {
        ticket: true,
      },
    });

    console.log(tickets);
    res.json(tickets);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while trying to fetch tickets" });
  }
};

export const createTicket = async (req, res) => {
  const { title, description, internalSecId, serviceId } = req.body;

  try {
    const ticket = await prisma.tickets.create({
      data: {
        title: title,
        description: description,
        UsersTickets: {
          create: {
            userId: req.user.id,
          },
        },
        internalSec: {
          connect: {
            id: internalSecId,
          },
        },
        service: {
          connect: {
            id: serviceId,
          },
        },
      },
      include: {
        service: true,
        UsersTickets: true,
        internalSec: true,
      },
    });

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
