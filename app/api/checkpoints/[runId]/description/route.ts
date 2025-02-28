import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
const prisma = new PrismaClient();

export async function PATCH(
  request: NextRequest,
  { params }: { params: { runId: string } }
) {
  try {
    const { runId } = await params;
    const { description } = await request.json();

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

    // Update the description
    const updatedRun = await prisma.simulationRun.update({
      where: { id: simulationRun.id },
      data: { description },
    });

    return NextResponse.json(updatedRun);
  } catch (error) {
    console.error('Error updating description:', error);
    return NextResponse.json(
      { error: 'Failed to update description' },
      { status: 500 }
    );
  }
} 