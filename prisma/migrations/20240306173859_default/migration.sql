/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Dependencies` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Dependencies" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Tickets" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'open',
ALTER COLUMN "priority" SET DEFAULT 'low';

-- CreateIndex
CREATE UNIQUE INDEX "Dependencies_name_key" ON "Dependencies"("name");
