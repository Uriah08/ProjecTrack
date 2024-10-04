import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { projectId: string } }) {
  const { projectId } = params;

  try {
    const tasks = await prisma.task.findMany({
      where: { projectId },
    });
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: 'Unable to fetch tasks' }, { status: 500 });
  }
}
