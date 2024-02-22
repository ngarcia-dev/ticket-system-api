-- CreateTable
CREATE TABLE "UsersInternalSec" (
    "userId" INTEGER NOT NULL,
    "internalSecId" INTEGER NOT NULL,

    CONSTRAINT "UsersInternalSec_pkey" PRIMARY KEY ("userId","internalSecId")
);

-- CreateTable
CREATE TABLE "InternalSec" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dependencyId" INTEGER NOT NULL,

    CONSTRAINT "InternalSec_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InternalSecServices" (
    "internalSecId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,

    CONSTRAINT "InternalSecServices_pkey" PRIMARY KEY ("internalSecId","serviceId")
);

-- CreateTable
CREATE TABLE "Services" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dependencies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Dependencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersTickets" (
    "userId" INTEGER NOT NULL,
    "ticketId" INTEGER NOT NULL,

    CONSTRAINT "UsersTickets_pkey" PRIMARY KEY ("userId","ticketId")
);

-- CreateTable
CREATE TABLE "Tickets" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "InternalSecId" INTEGER NOT NULL,
    "ServiceId" INTEGER NOT NULL,

    CONSTRAINT "Tickets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UsersInternalSec" ADD CONSTRAINT "UsersInternalSec_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersInternalSec" ADD CONSTRAINT "UsersInternalSec_internalSecId_fkey" FOREIGN KEY ("internalSecId") REFERENCES "InternalSec"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InternalSec" ADD CONSTRAINT "InternalSec_dependencyId_fkey" FOREIGN KEY ("dependencyId") REFERENCES "Dependencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InternalSecServices" ADD CONSTRAINT "InternalSecServices_internalSecId_fkey" FOREIGN KEY ("internalSecId") REFERENCES "InternalSec"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InternalSecServices" ADD CONSTRAINT "InternalSecServices_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersTickets" ADD CONSTRAINT "UsersTickets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersTickets" ADD CONSTRAINT "UsersTickets_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_InternalSecId_fkey" FOREIGN KEY ("InternalSecId") REFERENCES "InternalSec"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_ServiceId_fkey" FOREIGN KEY ("ServiceId") REFERENCES "Services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
