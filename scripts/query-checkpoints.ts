import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Define the type for our SimulationRun model
interface SimulationRun {
  id: number;
  runId: string;
  description: string | null;
  createdAt: Date;
  visible: boolean;
  checkpoint: any; // Using any for now since checkpoint structure can vary
}

async function queryFirstCheckpoint(runId: string) {
  try {
    const firstCheckpoint = await prisma.simulationRun.findFirst({
      where: { runId },
      orderBy: { createdAt: 'asc' },
    }) as unknown as SimulationRun;

    if (!firstCheckpoint) {
      console.log(`\nNo checkpoint found for runId: ${runId}`);
      return;
    }

    console.log(`\nFirst Checkpoint for Run: ${runId}`);
    console.log(`ID: ${firstCheckpoint.id}`);
    console.log(`Created: ${firstCheckpoint.createdAt}`);
    console.log(`Visible: ${firstCheckpoint.visible}`);
    
    try {
      const data = firstCheckpoint.checkpoint;
      if (data) {
        console.log(data);
        // console.log('\nAgent Details:');
        // data.social_environment.agents.forEach((agent: any, index: number) => {
        //   console.log(`\nAgent #${index + 1}:`);
        //   console.log(`  ID: ${agent.id}`);
        //   console.log(`  Type: ${agent.type}`);
        //   if (agent.state) {
        //     console.log(`  HP: ${agent.state.hp}`);
        //     console.log(`  Position: (${agent.state.x}, ${agent.state.y})`);
        //   }
        // });
      }
    } catch (e) {
      console.log(`Unable to parse checkpoint data`);
    }
  } catch (error) {
    console.error('Error querying checkpoint:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function queryCheckpoints(targetRunId?: string) {
  try {
    if (targetRunId) {
      // Query for a specific runId
      const checkpoints = await prisma.simulationRun.findMany({
        where: { runId: targetRunId },
        orderBy: { createdAt: 'asc' }, // Order by creation time ascending to show progression
      }) as unknown as SimulationRun[];

      if (checkpoints.length === 0) {
        console.log(`\nNo checkpoints found for runId: ${targetRunId}`);
        return;
      }

      console.log(`\nSimulation Run: ${targetRunId}`);
      console.log(`Total Checkpoints: ${checkpoints.length}`);
      console.log(`First Checkpoint: ${checkpoints[0].createdAt}`);
      console.log(`Latest Checkpoint: ${checkpoints[checkpoints.length - 1].createdAt}`);
      console.log(`Duration: ${(new Date(checkpoints[checkpoints.length - 1].createdAt).getTime() - new Date(checkpoints[0].createdAt).getTime()) / 1000} seconds`);
      
      console.log('\nCheckpoints:');
      checkpoints.forEach((checkpoint, index) => {
        console.log(`\n  Checkpoint #${index + 1}:`);
        console.log(`    ID: ${checkpoint.id}`);
        console.log(`    Created: ${checkpoint.createdAt}`);
        console.log(`    Visible: ${checkpoint.visible}`);
        // Log some basic metrics from the checkpoint data
        try {
          const data = checkpoint.checkpoint;
          if (data.social_environment?.agents) {
            console.log(`    Agents: ${data.social_environment.agents.length}`);
          }
        } catch (e) {
          console.log(`    Data: Unable to parse checkpoint data`);
        }
      });
    } else {
      // Query all unique runIds
      const allRuns = await prisma.simulationRun.findMany({
        orderBy: { createdAt: 'desc' },
      }) as unknown as SimulationRun[];

      // Group checkpoints by runId
      const checkpointsByRunId = new Map<string, SimulationRun[]>();
      allRuns.forEach(run => {
        const checkpoints = checkpointsByRunId.get(run.runId) || [];
        checkpoints.push(run);
        checkpointsByRunId.set(run.runId, checkpoints);
      });

      console.log(`\nFound ${checkpointsByRunId.size} simulation runs`);
      console.log(`Total checkpoints across all runs: ${allRuns.length}`);
      
      // Print details for each simulation run
      checkpointsByRunId.forEach((checkpoints, runId) => {
        const sortedCheckpoints = checkpoints.sort((a, b) => 
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        
        console.log(`\nSimulation Run: ${runId}`);
        console.log(`  Total Checkpoints: ${checkpoints.length}`);
        console.log(`  First Checkpoint: ${sortedCheckpoints[0].createdAt}`);
        console.log(`  Latest Checkpoint: ${sortedCheckpoints[sortedCheckpoints.length - 1].createdAt}`);
        console.log(`  Duration: ${(new Date(sortedCheckpoints[sortedCheckpoints.length - 1].createdAt).getTime() - new Date(sortedCheckpoints[0].createdAt).getTime()) / 1000} seconds`);
      });
    }
  } catch (error) {
    console.error('Error querying checkpoints:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Get command and runId from command line arguments
const command = process.argv[2];
const runId = process.argv[3];

if (command === 'first' && runId) {
  queryFirstCheckpoint(runId);
} else {
  queryCheckpoints(command); // maintain backward compatibility
} 