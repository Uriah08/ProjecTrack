import { NextResponse } from "next/server";
import { db } from "@/src/lib/db";
import { projectSchema } from "@/src/schemas";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url); // Extract query params
  const userId = searchParams.get('userId'); // Get the userId from the query params

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    // Fetch projects by userId
    const projects = await db.project.findMany({
      where: { userId },
      include: {
        _count: {
          select: { tasks: true },
        },
      },
    });
    

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: `Failed to fetch projects: ${error}` }, { status: 500 });
  }
}

export async function POST(req:Request) {
    const body = await req.json()

    const parseResult = projectSchema.safeParse(body)

    if(!parseResult.success) {
        return NextResponse.json({ errors: 'Error parsing the schema' }, { status: 400 })
    }

    const { name, description, startDate, endDate, userId } = parseResult.data

    try {
        const project = await db.project.create({
            data: {
                name,
                description,
                startDate,
                endDate,
                userId
            }
        })

        return NextResponse.json(project, { status: 201})
    } catch (error) {
        return NextResponse.json({ error: `Failed to create a project. ${error}`})
    }
}