import { NextResponse } from "next/server";
import { db } from "@/src/lib/db";
import { projectSchema } from "@/src/schemas";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const projects = await db.project.findMany({
      where: { userId },
      include: { _count: { select: { tasks: true } } },
    });

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error); // Log the error for debugging
    return NextResponse.json({ error: `Failed to fetch projects: ${error}` }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const parseResult = projectSchema.safeParse(body);

  if (!parseResult.success) {
    return NextResponse.json({ errors: "Error parsing the schema" }, { status: 400 });
  }

  const { name, description, startDate, endDate, userId } = parseResult.data;

  try {
    const project = await db.project.create({
      data: { name, description, startDate, endDate, userId },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: `Failed to create a project: ${error}` }, { status: 500 });
  }
}
