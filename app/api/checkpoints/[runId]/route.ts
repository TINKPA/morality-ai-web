import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest,
  { params }: { params: { runId: string } }
) {
  try {
    const { runId } = await params;

    // Find all simulation runs with this runId
    const simulationRuns = await prisma.simulationRun.findMany({
      where: { runId },
    });

    console.log(`[DELETE /api/checkpoints/${runId}] Found ${simulationRuns.length} runs with this runId`);

    if (simulationRuns.length === 0) {
      return NextResponse.json(
        { error: `Simulation run ${runId} not found` },
        { status: 404 }
      );
    }

    // Update all runs to set visible = false (soft delete)
    const updatePromises = simulationRuns.map(run => 
      prisma.simulationRun.update({
        where: { id: run.id },
        data: { visible: false },
      })
    );
    
    await Promise.all(updatePromises);
    console.log(`[DELETE /api/checkpoints/${runId}] Successfully hidden ${simulationRuns.length} runs`);

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

    // Find all simulation runs with this runId
    const simulationRuns = await prisma.simulationRun.findMany({
      where: { runId },
      orderBy: { createdAt: 'desc' },
    });

    console.log(`[GET /api/checkpoints/${runId}] Found ${simulationRuns.length} runs with this runId`);

    if (simulationRuns.length === 0) {
      return NextResponse.json(
        { error: `Simulation run ${runId} not found` },
        { status: 404 }
      );
    }

    // Return the latest run
    console.log(`[GET /api/checkpoints/${runId}] Returning latest run with createdAt: ${simulationRuns[0].createdAt}`);

    return NextResponse.json(simulationRuns);
  } catch (error) {
    console.error('Error fetching checkpoints:', error);
    return NextResponse.json(
      { error: 'Failed to fetch checkpoints' },
      { status: 500 }
    );
  }
} 