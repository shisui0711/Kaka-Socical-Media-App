import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getUserDataSelect } from "@/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React, { cache } from "react";
import UserProfile from "../UserProfile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserPosts from "./UserPosts";
import TaggedPosts from "./TaggedPosts";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

const getUser = cache(async (username: string, signedInUserId: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
    },
    select: getUserDataSelect(signedInUserId),
  });

  if (!user) notFound();

  return user;
});

export async function generateMetadata({
  params: { username },
}: ProfilePageProps): Promise<Metadata> {
  const { user: signedInUser } = await validateRequest();
  if (!signedInUser) return {};

  const user = await getUser(username, signedInUser.id);

  return {
    title: `@${user.username}`,
  };
}

const ProfilePage = async ({ params: { username } }: ProfilePageProps) => {
  const { user: signedInUser } = await validateRequest();
  if (!signedInUser)
    return (
      <div className="text-destructive">
        Để truy cập vào trang này. Hãy đang nhập
      </div>
    );

  const user = await getUser(username, signedInUser.id);

  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <UserProfile signedInUserId={signedInUser.id} user={user} />
        <Tabs defaultValue="owner">
          <TabsList className="w-full bg-card flex">
            <TabsTrigger
              value="owner"
              className="flex-1 data-[state=active]:font-bold"
            >
              Bài viết
            </TabsTrigger>
            <TabsTrigger
              value="tagged"
              className="flex-1 data-[state=active]:font-bold"
            >
              Được nhắc đến
            </TabsTrigger>
          </TabsList>
          <TabsContent value="owner">
            <UserPosts userId={user.id} />
          </TabsContent>
          <TabsContent value="tagged">
            <TaggedPosts userId={user.id} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default ProfilePage;
