import { prisma } from "../db.js";

export const createDependency = async (req, res) => {
  const { name, description } = req.body;

  try {
    const dependency = await prisma.dependencies.create({
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

export const getDependencies = async (req, res) => {
  try {
    const dependencies = await prisma.dependencies.findMany({
      include: {
        InternalSec: true,
      },
    });

    res.json(dependencies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDependency = async (req, res) => {
  try {
    const dependency = await prisma.dependencies.findUnique({
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
    const dependency = await prisma.dependencies.update({
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
    const dependency = await prisma.dependencies.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.json(dependency);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDependencyDependencies = async (req, res) => {
  try {
    const dependency = await prisma.dependencies.findFirst({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        dependencies: true,
      },
    });

    res.json(dependency);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
