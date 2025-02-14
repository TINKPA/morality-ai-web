import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a new simulation run
  const newRun = await prisma.simulationRun.create({
    data: {
      runId: "TEST_RUN_001",
      description: "Test simulation run",
      createdAt: new Date(),
      checkpoints: {
        create: [
          {
            timeStep: 1,
            data: {},
            createdAt: new Date(),
          },
        ],
      },
    },
  });
  console.log("New simulation run created:", newRun);

  // Query the simulation run
  const fetchedRun = await prisma.simulationRun.findUnique({
    where: { runId: "TEST_RUN_001" },
  });
  console.log("Fetched simulation run:", fetchedRun);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  }); 