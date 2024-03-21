-- CreateTable
CREATE TABLE "AssignTicket" (
    "userId" INTEGER NOT NULL,
    "ticketId" INTEGER NOT NULL,

    CONSTRAINT "AssignTicket_pkey" PRIMARY KEY ("userId","ticketId")
);

-- CreateTable
CREATE TABLE "DesignateTicket" (
    "userId" INTEGER NOT NULL,
    "ticketId" INTEGER NOT NULL,

    CONSTRAINT "DesignateTicket_pkey" PRIMARY KEY ("userId","ticketId")
);

-- CreateIndex
CREATE UNIQUE INDEX "AssignTicket_userId_key" ON "AssignTicket"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AssignTicket_ticketId_key" ON "AssignTicket"("ticketId");

-- CreateIndex
CREATE UNIQUE INDEX "DesignateTicket_userId_key" ON "DesignateTicket"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DesignateTicket_ticketId_key" ON "DesignateTicket"("ticketId");

-- AddForeignKey
ALTER TABLE "AssignTicket" ADD CONSTRAINT "AssignTicket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssignTicket" ADD CONSTRAINT "AssignTicket_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesignateTicket" ADD CONSTRAINT "DesignateTicket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesignateTicket" ADD CONSTRAINT "DesignateTicket_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "Ticket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
