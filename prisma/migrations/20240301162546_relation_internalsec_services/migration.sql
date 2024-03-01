/*
  Warnings:

  - You are about to drop the `InternalSecServices` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `internalSecId` to the `Services` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "InternalSecServices" DROP CONSTRAINT "InternalSecServices_internalSecId_fkey";

-- DropForeignKey
ALTER TABLE "InternalSecServices" DROP CONSTRAINT "InternalSecServices_serviceId_fkey";

-- AlterTable
ALTER TABLE "Services" ADD COLUMN     "internalSecId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "InternalSecServices";

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_internalSecId_fkey" FOREIGN KEY ("internalSecId") REFERENCES "InternalSec"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
