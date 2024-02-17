import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const rolesWithPermissions = await prisma.roles.findMany({
  include: {
    RolePermissions: true,
  },
});

console.log(rolesWithPermissions);
