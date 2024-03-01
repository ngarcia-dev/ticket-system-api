import { prisma } from "../db.js";

export const createServices = async (req, res) => {
  const { name, internalSecId } = req.body;

  try {
    const services = await prisma.services.create({
      data: {
        name,
        internalSecId,
      },
    });

    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getServices = async (req, res) => {
  try {
    const services = await prisma.services.findMany({
      include: {
        internalSec: true,
      },
    });

    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
