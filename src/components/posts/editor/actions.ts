"use server"

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { createPostSchema, CreatePostValues } from "@/lib/validation";
import { getPostDataInclude } from "@/types";

export async function submitPost(input:CreatePostValues) {
  const { user } = await validateRequest()
  if(!user) throw Error("Unauthorized")

  const { content, mediaIds } = createPostSchema.parse(input)

  const newPost = await prisma.post.create({
    data: {
      content,
      userId: user.id,
      attachments: {
        connect: mediaIds.map(id => ({ id }))
      }
    },
    include: getPostDataInclude(user.id)
  })

  return newPost
}