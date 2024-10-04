import { NextResponse } from "next/server";
import { db } from "@/src/lib/db";
import { taskSchema } from "@/src/schemas";

export async function GET(req: Request) {

    const { searchParams } = new URL(req.url)
    const projectId = searchParams.get('projectId')

    try {
        if (!projectId) {
            return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
        }
        
        const tasks = await db.task.findMany({
          where: {
            projectId: projectId
          }
        });
    
        return NextResponse.json(tasks, { status: 200 });
      } catch (error) {
        return NextResponse.json({ error: `Failed to fetch tasks. ${error}` }, { status: 500 });
      }
}

export async function POST(req: Request) {

    const body = await req.json()

    const parseResult = taskSchema.safeParse(body)

    if(!parseResult.success) {
        return NextResponse.json({ errors: 'Error parsing the schema' }, { status: 400 })
    }

    const { title, description, tags, priority, status, projectId } = parseResult.data

    try {
        const task = await db.task.create({
            data: {
                title,
                description,
                tags,
                priority,
                status,
                projectId
            }
        })

        return NextResponse.json(task, { status: 201})
    } catch (error) {
        return NextResponse.json({ error: `Failed to create a task. ${error}`})
    }
}

export async function PATCH(req: Request) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('taskId')

  const { status, title, description, tags, priority } = await req.json();

  try {
    if(!id) {
        return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
    }

    const updatedTask = await db.task.update({
      where: { id },
      data: {
        status,
        title,
        description,
        tags,
        priority,
      },
    });
    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json({ error: `Failed to update task ${error}` }, { status: 500 });
  }
}
