import { isRateLimited } from "@/app/rate-limiter";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { BookmarkInfo, LikeInfo } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { postId } }: { params: { postId: string } }
) {
  try {
    const { user: signedInUser } = await validateRequest();

    if (!signedInUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // if (isRateLimited(req))
    //   return NextResponse.json({ error: "Too many requests" }, { status: 429 });

    const bookmark = await prisma.bookmark.findUnique({
      where: {
        userId_postId: {
          userId: signedInUser.id,
          postId
        }
      }
    })

    const data: BookmarkInfo = {
      isBookmarkedByUser: !!bookmark
    };

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params: { postId } }: { params: { postId: string } }
) {
  try {
    const { user: signedInUser } = await validateRequest();

    if (!signedInUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // if (isRateLimited(req))
    //   return NextResponse.json({ error: "Too many requests" }, { status: 429 });

    await prisma.bookmark.upsert({
      where: {
        userId_postId: {
          userId: signedInUser.id,
          postId,
        }
      },
      create: {
        userId: signedInUser.id,
        postId,
      },
      update: {},
    })

    return NextResponse.json({ message: "Success" },{ status: 200 });
  } catch (error) {
    console.log("Post failed", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params: { postId } }: { params: { postId: string } }
) {
  try {
    const { user: signedInUser } = await validateRequest();

    if (!signedInUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // if (isRateLimited(req))
    //   return NextResponse.json({ error: "Too many requests" }, { status: 429 });

    await prisma.bookmark.deleteMany({
      where: {
        userId: signedInUser.id,
        postId,
      }
    })

    return NextResponse.json({ message: "Success" },{ status: 200 });
  } catch (error) {
    console.log("Post failed", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}