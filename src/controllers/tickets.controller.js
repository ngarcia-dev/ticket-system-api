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
