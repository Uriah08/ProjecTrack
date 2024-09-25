import { NextResponse } from "next/server";
import { db } from "@/src/lib/db";

interface Props {
    params: {
        id: string
    }
}

export async function GET(req: Request, { params }: Props) {
    const { id } = params

    try {
        const project = await db.project.findUnique({
            where: {id},
            include: {
                user: true, // Includes the user relation if you want user details as well
            }
        })

        if (!project) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
          }
      
          return NextResponse.json(project, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: `Failed to fetch project. ${error}` }, { status: 500 });
    }
}