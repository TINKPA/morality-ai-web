import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest,
  { params }: { params: { runId: string } }
) {
  try {
    const { runId } = await params;

    // Find the simulation run by runId
    const simulationRun = await prisma.simulationRun.findUnique({
      where: { runId },
    });

    if (!simulationRun) {
      return NextResponse.json(
        { error: `Simulation run ${runId} not found` },
        { status: 404 }
      );
    }

    // Update the run to set visible = false (soft delete)
    const updatedRun = await prisma.simulationRun.update({
      where: { id: simulationRun.id },
      data: { visible: false },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error hiding simulation run:', error);
    return NextResponse.json(
      { error: 'Failed to hide simulation run' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  context: { params: { runId: string } }
) {
  try {
    // Await the params object before destructuring
    const params = await context.params;
    const { runId } = params;

    // Find the simulation run by runId with all its checkpoints
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

    // Return all checkpoints for this run
    return NextResponse.json(simulationRun.checkpoints);
  } catch (error) {
    console.error('Error fetching checkpoints:', error);
    return NextResponse.json(
      { error: 'Failed to fetch checkpoints' },
      { status: 500 }
    );
  }
} 