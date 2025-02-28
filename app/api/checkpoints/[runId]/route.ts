import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest,
  { params }: { params: { runId: string } }
) {
  try {
    const { runId } = params;

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

    // Delete all associated checkpoints first
    await prisma.checkpoint.deleteMany({
      where: { simulationRunId: simulationRun.id },
    });

    // Then delete the simulation run
    await prisma.simulationRun.delete({
      where: { id: simulationRun.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting simulation run:', error);
    return NextResponse.json(
      { error: 'Failed to delete simulation run' },
      { status: 500 }
    );
  }
} 