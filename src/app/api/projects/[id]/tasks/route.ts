import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest, { params }: { params: { projectId: string } }) {
  const { projectId } = params;

  try {
    const tasks = await db.task.findMany({
      where: { projectId: projectId.toString() },
    });
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: 'Unable to fetch tasks' }, { status: 500 });
  }
}
