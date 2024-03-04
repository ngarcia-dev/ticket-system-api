import { prisma } from "../db.js";

export const createInternalsec = async (req, res) => {
  const { name, dependencyId } = req.body;

  try {
    const internalsec = await prisma.internalSec.create({
      data: {
        name,
        dependencyId,
      },
    });

    res.json(internalsec);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getInternalsec = async (req, res) => {
  try {
    const internalsec = await prisma.internalSec.findMany({
      include: {
        services: true,
      },
    });

    res.json(internalsec);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
