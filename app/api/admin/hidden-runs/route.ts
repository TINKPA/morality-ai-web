import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch all hidden simulation runs
    const runs = await prisma.simulationRun.findMany({
      where: { visible: false },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(runs);
  } catch (error) {
    console.error('Error fetching hidden runs:', error);
    return NextResponse.error();
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { runId: string } }
) {
  try {
    const { runId } = params;

    // Find the simulation run by runId
    const simulationRun = await prisma.simulationRun.findFirst({
      where: { runId },
    });

    if (!simulationRun) {
      return NextResponse.json(
        { error: `Simulation run ${runId} not found` },
        { status: 404 }
      );
    }

    // Restore the run by setting visible = true
    const updatedRun = await prisma.simulationRun.update({
      where: { id: simulationRun.id },
      data: { visible: true },
    });

    return NextResponse.json(updatedRun);
  } catch (error) {
    console.error('Error restoring simulation run:', error);
    return NextResponse.json(
      { error: 'Failed to restore simulation run' },
      { status: 500 }
    );
  }
} 