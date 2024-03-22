/*
  Warnings:

  - You are about to drop the `AssignTicket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DesignateTicket` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AssignTicket" DROP CONSTRAINT "AssignTicket_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "AssignTicket" DROP CONSTRAINT "AssignTicket_userId_fkey";

-- DropForeignKey
ALTER TABLE "DesignateTicket" DROP CONSTRAINT "DesignateTicket_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "DesignateTicket" DROP CONSTRAINT "DesignateTicket_userId_fkey";

-- DropTable
DROP TABLE "AssignTicket";

-- DropTable
DROP TABLE "DesignateTicket";

-- CreateTable
CREATE TABLE "AssignerTicket" (
    "assignerId" INTEGER NOT NULL,
    "ticketId" INTEGER NOT NULL,

    CONSTRAINT "AssignerTicket_pkey" PRIMARY KEY ("assignerId","ticketId")
);

-- CreateTable
CREATE TABLE "ExecutorTicket" (
    "executorId" INTEGER NOT NULL,
    "ticketId" INTEGER NOT NULL,

    CONSTRAINT "ExecutorTicket_pkey" PRIMARY KEY ("executorId","ticketId")
);

-- CreateIndex
CREATE UNIQUE INDEX "AssignerTicket_ticketId_key" ON "AssignerTicket"("ticketId");

-- CreateIndex
CREATE UNIQUE INDEX "ExecutorTicket_ticketId_key" ON "ExecutorTicket"("ticketId");

-- AddForeignKey
ALTER TABLE "AssignerTicket" ADD CONSTRAINT "AssignerTicket_assignerId_fkey" FOREIGN KEY ("assignerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignerTicket" ADD CONSTRAINT "AssignerTicket_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExecutorTicket" ADD CONSTRAINT "ExecutorTicket_executorId_fkey" FOREIGN KEY ("executorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExecutorTicket" ADD CONSTRAINT "ExecutorTicket_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
