import { prisma } from "../db.js";
// attempt of the function to insert roles with their corresponding permissions
export const createRole = async (req, res) => {
  const { name, roleId, permissionId } = req.body;
  const role = await prisma.roles.create({
    data: {
      name,
      RolePermissions: {
        create: [
          {
            roleId,
            permissionId,
          },
        ],
      },
      include: {
        RolePermissions: true,
      },
    },
  });
  res.json(role);
};
