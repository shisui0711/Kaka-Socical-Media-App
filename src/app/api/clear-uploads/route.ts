import prisma from "@/lib/prisma";
import { UTApi } from "uploadthing/server";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");

    if (
      !authHeader ||
      authHeader !== `Bearer ${process.env.CLEAR_UPLOADS_SECRET}`
    ) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const unUsedMedia = await prisma.media.findMany({
      where: {
        postId: null,
        ...(process.env.NODE_ENV === "production"
          ? {
              createAt: {
                lte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 days ago
              },
            }
          : {
              // createAt: {
              //   lte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
              // },
            }),
      },
      select: {
        id: true,
        url: true,
      }
    });
    new UTApi().deleteFiles(
      unUsedMedia.map((media) => media.url.split(`/a/${process.env.biwq1godl1}`)[1])
    )

    await prisma.media.deleteMany({
      where: {
        id:{
          in: unUsedMedia.map((media) => media.id)
        }
      }
    })

    return Response.json({ message: "success" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
