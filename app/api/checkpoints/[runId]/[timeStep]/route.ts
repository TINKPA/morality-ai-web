import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { runId: string; timeStep: string } }
) {
  try {
    const { runId, timeStep } = await params;

    // Find the simulation run by runId
    const simulationRun = await prisma.simulationRun.findUnique({
      where: { runId },
      include: { checkpoints: true },
    });

    if (!simulationRun) {
      return NextResponse.json(
        { error: `Simulation run ${runId} not found` },
        { status: 404 }
      );
    }

    // Find the checkpoint corresponding to the provided timeStep.
    const checkpoint = simulationRun.checkpoints.find(
      (cp) => cp.timeStep === parseInt(timeStep)
    );

    if (!checkpoint) {
      return NextResponse.json(
        { error: `Checkpoint for timeStep ${timeStep} not found in run ${runId}` },
        { status: 404 }
      );
    }

    return NextResponse.json(checkpoint);
  } catch (error) {
    console.error('Error fetching checkpoint:', error);
    return NextResponse.error();
  }
}
