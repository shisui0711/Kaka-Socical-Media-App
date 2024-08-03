import { validateRequest } from "@/auth";
import Post from "@/components/posts/Post";
import UserInfoSidebar from "@/components/UserInfoSidebar";
import prisma from "@/lib/prisma";
import { getPostDataInclude, UserData } from "@/types";
import { Loader } from "lucide-react";
import { notFound } from "next/navigation";
import React, { cache, Suspense } from "react";

interface PageProps {
  params: {
    postId: string;
  };
}

const getPost = cache(async (postId: string, signedInUserId: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: getPostDataInclude(signedInUserId),
  });
  if (!post) notFound();

  return post;
});

const PostPage = async ({ params: { postId } }: PageProps) => {
  const { user: signedInUser } = await validateRequest();
  if (!signedInUser)
    return (
      <div className="text-destructive">
        Để truy cập vào trang này. Hãy đang nhập
      </div>
    );

  const post = await getPost(postId, signedInUser.id);

  return (
    <main className="flex w-full min-w-0 gap-5 relative">
      <div className="w-full min-w-0 space-y-5">
        <Post post={post} />
      </div>
      <div className="sticky top-0 hidden h-fit w-80 flex-none lg:block">
        <Suspense fallback={<Loader className="mx-auto animate-spin" />} >
          <UserInfoSidebar user={post.user} />
        </Suspense>
      </div>
    </main>
  );
};

export default PostPage;
