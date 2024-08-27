import { prisma } from "../db.js";

export const createDependency = async (req, res) => {
  const { name, description } = req.body;

  try {
    const dependency = await prisma.dependency.create({
      data: {
        name,
        description,
      },
    });

    res.status(204).json(dependency);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDependencies = async (req, res) => {
  try {
    const dependencies = await prisma.dependency.findMany({
      include: {
        internalSec: {
          include: {
            service: true,
          },
        },
      },
    });

    res.json(dependencies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDependency = async (req, res) => {
  try {
    const dependency = await prisma.dependency.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.json(dependency);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateDependency = async (req, res) => {
  const { name, description } = req.body;

  try {
    const dependency = await prisma.dependency.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        name,
        description,
      },
    });

    res.json(dependency);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteDependency = async (req, res) => {
  try {
    const dependency = await prisma.dependency.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.status(204).json(dependency);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
