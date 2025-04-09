// app/api/checkpoints/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // First, get all unique runIds
    const allRuns = await prisma.simulationRun.findMany({
      where: { visible: true },
      orderBy: { createdAt: 'desc' },
    });

    console.log(`[GET /api/checkpoints] Total runs found: ${allRuns.length}`);

    // Create a map to store the first run for each runId
    const uniqueRunsMap = new Map();
    
    // Keep only the first occurrence of each runId (which will be the latest due to desc sort)
    allRuns.forEach(run => {
      if (!uniqueRunsMap.has(run.runId)) {
        uniqueRunsMap.set(run.runId, run);
      }
    });

    // Convert map values back to array
    const uniqueRuns = Array.from(uniqueRunsMap.values());

    console.log(`[GET /api/checkpoints] Unique runs after filtering: ${uniqueRuns.length}`);
    console.log(`[GET /api/checkpoints] RunIds:`, uniqueRuns.map(run => run.runId));

    return NextResponse.json(uniqueRuns);
  } catch (error) {
    console.error('Error fetching simulation runs:', error);
    return NextResponse.error();
  }
}
