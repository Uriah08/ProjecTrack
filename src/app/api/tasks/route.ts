import { NextResponse } from "next/server";
import { db } from "@/src/lib/db";
import { taskSchema } from "@/src/schemas";

export async function GET() {
    try {
        const tasks = await db.task.findMany({
          include: {
            project: true, // Includes the user relation if you want user details as well
          },
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