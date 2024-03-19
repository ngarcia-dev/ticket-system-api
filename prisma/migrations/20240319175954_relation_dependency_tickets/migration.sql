/*
  Warnings:

  - Added the required column `dependencyDestId` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "dependencyDestId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_dependencyDestId_fkey" FOREIGN KEY ("dependencyDestId") REFERENCES "Dependency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
