/*
  Warnings:

  - You are about to drop the `Dependencies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Permissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RolePermissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Services` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tickets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsersInternalSec` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsersRoles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsersTickets` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InternalSec" DROP CONSTRAINT "InternalSec_dependencyId_fkey";

-- DropForeignKey
ALTER TABLE "RolePermissions" DROP CONSTRAINT "RolePermissions_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "RolePermissions" DROP CONSTRAINT "RolePermissions_roleId_fkey";

-- DropForeignKey
ALTER TABLE "Services" DROP CONSTRAINT "Services_internalSecId_fkey";

-- DropForeignKey
ALTER TABLE "Tickets" DROP CONSTRAINT "Tickets_InternalSecId_fkey";

-- DropForeignKey
ALTER TABLE "Tickets" DROP CONSTRAINT "Tickets_ServiceId_fkey";

-- DropForeignKey
ALTER TABLE "UsersInternalSec" DROP CONSTRAINT "UsersInternalSec_internalSecId_fkey";

-- DropForeignKey
ALTER TABLE "UsersInternalSec" DROP CONSTRAINT "UsersInternalSec_userId_fkey";

-- DropForeignKey
ALTER TABLE "UsersRoles" DROP CONSTRAINT "UsersRoles_roleId_fkey";

-- DropForeignKey
ALTER TABLE "UsersRoles" DROP CONSTRAINT "UsersRoles_userId_fkey";

-- DropForeignKey
ALTER TABLE "UsersTickets" DROP CONSTRAINT "UsersTickets_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "UsersTickets" DROP CONSTRAINT "UsersTickets_userId_fkey";

-- DropTable
DROP TABLE "Dependencies";

-- DropTable
DROP TABLE "Permissions";

-- DropTable
DROP TABLE "RolePermissions";

-- DropTable
DROP TABLE "Roles";

-- DropTable
DROP TABLE "Services";

-- DropTable
DROP TABLE "Tickets";

-- DropTable
DROP TABLE "Users";

-- DropTable
DROP TABLE "UsersInternalSec";

-- DropTable
DROP TABLE "UsersRoles";

-- DropTable
DROP TABLE "UsersTickets";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dependency" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Dependency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "internalSecId" INTEGER NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'open',
    "priority" TEXT NOT NULL DEFAULT 'low',
    "internalSecDestId" INTEGER NOT NULL,
    "serviceProvidedId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "userId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("userId","roleId")
);

-- CreateTable
CREATE TABLE "RolePermission" (
    "roleId" INTEGER NOT NULL,
    "permissionId" INTEGER NOT NULL,

    CONSTRAINT "RolePermission_pkey" PRIMARY KEY ("roleId","permissionId")
);

-- CreateTable
CREATE TABLE "UserInternalSec" (
    "userId" INTEGER NOT NULL,
    "internalSecId" INTEGER NOT NULL,

    CONSTRAINT "UserInternalSec_pkey" PRIMARY KEY ("userId","internalSecId")
);

-- CreateTable
CREATE TABLE "AuthorTicket" (
    "authorId" INTEGER NOT NULL,
    "ticketId" INTEGER NOT NULL,

    CONSTRAINT "AuthorTicket_pkey" PRIMARY KEY ("authorId","ticketId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Dependency_name_key" ON "Dependency"("name");

-- AddForeignKey
ALTER TABLE "InternalSec" ADD CONSTRAINT "InternalSec_dependencyId_fkey" FOREIGN KEY ("dependencyId") REFERENCES "Dependency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_internalSecId_fkey" FOREIGN KEY ("internalSecId") REFERENCES "InternalSec"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_internalSecDestId_fkey" FOREIGN KEY ("internalSecDestId") REFERENCES "InternalSec"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_serviceProvidedId_fkey" FOREIGN KEY ("serviceProvidedId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RolePermission" ADD CONSTRAINT "RolePermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInternalSec" ADD CONSTRAINT "UserInternalSec_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInternalSec" ADD CONSTRAINT "UserInternalSec_internalSecId_fkey" FOREIGN KEY ("internalSecId") REFERENCES "InternalSec"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorTicket" ADD CONSTRAINT "AuthorTicket_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthorTicket" ADD CONSTRAINT "AuthorTicket_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
