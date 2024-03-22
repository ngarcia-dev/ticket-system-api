import { prisma } from "../db.js";

export const createTicket = async (req, res) => {
  const { title, description, dependencyDest, internalSecDest, serviceId } =
    req.body;

  try {
    const dependency = await prisma.dependency.findUnique({
      where: {
        id: dependencyDest,
      },
      include: {
        internalSec: {
          include: {
            service: true,
          },
        },
      },
    });

    if (!dependency)
      return res.status(404).json({ error: "Dependency not found" });

    const internalSec = dependency.internalSec.find(
      (sec) => sec.id === internalSecDest
    );

    if (!internalSec)
      return res.status(404).json({ error: "Internal sector not found" });

    const service = internalSec.service.find((serv) => serv.id === serviceId);

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
        dependencyDestId: dependencyDest,
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
        assignerTicket: {
          select: {
            assignerId: true,
          },
        },
        executorTicket: {
          select: {
            executorId: true,
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
        assignerTicket: {
          select: {
            assignerId: true,
          },
        },
        executorTicket: {
          select: {
            executorId: true,
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
export const getTicketsDependency = async (req, res) => {
  const { internalSec } = req.user;

  try {
    const internalSector = await prisma.internalSec.findUnique({
      where: {
        id: internalSec,
      },
      select: {
        dependencyId: true,
      },
    });

    if (!internalSector)
      return res.status(404).json({ error: "Internal sector not found" });

    const allTicketsForDependency = await prisma.ticket.findMany({
      where: {
        dependencyDestId: internalSector.dependencyId,
      },
      include: {
        authorTicket: {
          select: {
            authorId: true,
          },
        },
        assignerTicket: {
          select: {
            assignerId: true,
          },
        },
        executorTicket: {
          select: {
            executorId: true,
          },
        },
      },
    });

    res.json(allTicketsForDependency);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Assigns a ticket to a executor.
 * Pending: Validate if the ticket is already assigned.
 */
export const assignerTickets = async (req, res) => {
  const { ticketId } = req.params;
  const { id } = req.user;

  try {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id: parseInt(ticketId),
      },
    });

    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    const existingAssignment = await prisma.assignerTicket.findUnique({
      where: {
        assignerId_ticketId: {
          assignerId: id,
          ticketId: parseInt(ticketId),
        },
      },
    });

    if (existingAssignment)
      return res.status(400).json({ error: "Ticket already assigned" });

    const assigner = await prisma.assignerTicket.create({
      data: {
        assignerId: id,
        ticketId: parseInt(ticketId),
      },
    });

    res.json(assigner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//   const { ticketId } = req.params;
//   const { id } = req.user;

//   try {
//     const ticket = await prisma.ticket.findUnique({
//       where: {
//         id: parseInt(ticketId),
//       },
//     });

//     if (!ticket) return res.status(404).json({ error: "Ticket not found" });

//     const existingAssignment = await prisma.assignerTicket.findUnique({
//       where: {
//         assignerId_ticketId: {
//           assignerId: id,
//           ticketId: parseInt(ticketId),
//         },
//       },
//     });

//     if (existingAssignment)
//       return res.status(400).json({ error: "Ticket already assigned" });

//     const assigner = await prisma.assignerTicket.create({
//       data: {
//         assignerId: id,
//         ticketId: parseInt(ticketId),
//       },
//     });

//     res.json(assigner);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
