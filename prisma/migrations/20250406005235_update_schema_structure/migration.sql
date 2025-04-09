/*
  Warnings:

  - You are about to drop the `Checkpoint` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Checkpoint" DROP CONSTRAINT "Checkpoint_simulationRunId_fkey";

-- DropTable
DROP TABLE "Checkpoint";

-- CreateTable
CREATE TABLE "TimeStep" (
    "id" SERIAL NOT NULL,
    "simulationRunId" INTEGER NOT NULL,
    "timeStep" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TimeStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AgentUpdate" (
    "id" SERIAL NOT NULL,
    "timeStepId" INTEGER NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AgentUpdate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TimeStep" ADD CONSTRAINT "TimeStep_simulationRunId_fkey" FOREIGN KEY ("simulationRunId") REFERENCES "SimulationRun"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentUpdate" ADD CONSTRAINT "AgentUpdate_timeStepId_fkey" FOREIGN KEY ("timeStepId") REFERENCES "TimeStep"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
