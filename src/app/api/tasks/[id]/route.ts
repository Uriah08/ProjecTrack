import { NextResponse } from 'next/server';
import { db } from '@/lib/db'; 

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const taskId = params.id;

  try {
    const { status } = await req.json();

    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 });
    }

    const updatedTask = await db.task.update({
      where: { id: taskId },
      data: { status },
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error('Error updating task status:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
