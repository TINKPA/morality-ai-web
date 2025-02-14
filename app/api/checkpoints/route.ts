 // app/api/checkpoints/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Fetch all simulation runs sorted by createdAt descending
    const runs = await prisma.simulationRun.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(runs);
  } catch (error) {
    console.error('Error fetching simulation runs:', error);
    return NextResponse.error();
  }
}
