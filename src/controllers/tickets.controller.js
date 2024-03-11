import { prisma } from "../db.js";

/**
 * Retrieves all tickets from the database.
 */
export const getTickets = async (req, res) => {
  try {
    const tickets = await prisma.ticket.findMany();

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
            authorTicket: {
              include: {
                author: {
                  select: {
                    username: true,
                  },
                },
              },
            },
            serviceProvided: true,
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
    const tickets = await prisma.authorTicket.findMany({
      where: {
        // verify if the user is the author of the ticket
        authorId: parseInt(req.params.id),
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
