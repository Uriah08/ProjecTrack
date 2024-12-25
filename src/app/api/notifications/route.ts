import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {

    try {
        const notifications = await db.project.findMany({
            where: {
              endDate: {
                lte: new Date(new Date().setDate(new Date().getDate() + 1)),
              },
              notificationLate: false,
            },
            select: {
              id: true,
              name: true,
            },
          });
        
          // Mark notificationLate as true
          await db.project.updateMany({
            where: {
              id: { in: notifications.map((n) => n.id) },
            },
            data: { notificationLate: true },
          });
        
          return NextResponse.json({ notifications, message: 'Notifications created' },{ status: 200});
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'Internal Server Error' },{ status: 500});
    }
  }

  export async function POST() {

    try {
        await db.project.updateMany({
            where: { readNotificationLate: false },
            data: { readNotificationLate: true },
          });

        return NextResponse.json({ message: 'Notifications marked as read' },{ status: 200});
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'Internal Server Error' },{ status: 500});
    }
  }
  