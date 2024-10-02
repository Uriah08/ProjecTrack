import { NextResponse } from "next/server";
import { db } from "@/src/lib/db";

interface Props {
    params: {
        id: string
    }
}

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const userId = searchParams.get('userId'); // Get the userId from the query string

//   try {
//     const projects = await db.project.findMany({
//       where: {
//         userId, // Filters projects by userId
//       },
//     });

//     return NextResponse.json(projects, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: `Failed to fetch projects. ${error}` }, { status: 500 });
//   }
// }


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

export async function DELETE(req: Request, { params }: Props) {
    const { id } = params;
  
    try {
      const project = await db.project.delete({
        where: { id },
      });
  
      return NextResponse.json(project, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: `Failed to delete project. ${error}` }, { status: 500 });
    }
  }