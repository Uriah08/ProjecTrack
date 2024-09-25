import { NextResponse } from "next/server";
import { db } from "@/src/lib/db";
import { projectSchema } from "@/src/schemas";

export async function GET() {
    try {
        const projects = await db.project.findMany({
          include: {
            user: true, // Includes the user relation if you want user details as well
          },
        });
    
        return NextResponse.json(projects, { status: 200 });
      } catch (error) {
        return NextResponse.json({ error: `Failed to fetch projects. ${error}` }, { status: 500 });
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