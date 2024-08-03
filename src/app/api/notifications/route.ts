import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { notificationInclude } from "@/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

    const pageSize = 5;

    const { user } = await validateRequest();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const notifications = await prisma.notification.findMany({
      where: {
        recipientId: user.id,
      },
      include: notificationInclude,
      orderBy: { createAt: 'desc'},
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    })

    const nextCursor = notifications.length > pageSize ? notifications[pageSize].id : null;

    return Response.json({ notifications: notifications.slice(0, pageSize), nextCursor }, { status: 200 });

  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}