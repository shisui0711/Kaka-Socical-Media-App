import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { Loader } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import UserAvatar from "./UserAvatar";
import { unstable_cache } from "next/cache";
import { cn, formatNumber } from "@/lib/utils";
import FollowButton from "./FollowButton";
import { getUserDataSelect } from "@/types";
import UserTooltip from "./UserTooltip";

const RightSidebar = () => {

  return (
    <div className={cn("sticky self-start top-0 hidden h-fit w-72 flex-none space-y-5 md:block lg:w-80"
    )}> 
      <Suspense
        fallback={
          <div className="rounded-2xl bg-card p-5 shadow-sm">
            <Loader className="animate-spin mx-auto" />
          </div>
        }
      >
        <WhoToFollow />
        <TrendingTags/>
      </Suspense>
    </div>
  );
};

export default RightSidebar;

async function WhoToFollow() {
  const { user } = await validateRequest();

  if (!user) return null;
  const usersToFollow = await prisma.user.findMany({
    where: {
      NOT: {
        id: user.id,
      },
      followers: {
        none: {
          followerId: user.id
        }
      }
    },
    select: getUserDataSelect(user.id),
    take: 5,
  });

  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-xl font-bold">Bạn có thể biết</div>
      {usersToFollow.map((user) => (
        <div key={user.id} className="flex items-center justify-between gap-3">
          <UserTooltip user={user}>
          <Link
            href={`/profile/${user.username}`}
            className="flex gap-2 items-center"
          >
            <UserAvatar avatarUrl={user.avatarUrl} />
            <div className="flex flex-col">
              <p className="line-clamp-1 break-all font-semibold hover:underline">
                {user.displayName}
              </p>
              <p className="line-clamp-1 text-sm break-all text-muted-foreground">
                @{user.username}
              </p>
            </div>
          </Link>
          </UserTooltip>
          <FollowButton userId={user.id}
            initialState={{
              followers: user._count.followers,
              isFollowedByUser : user.followers.some(
                ({followerId}) => followerId === user.id
              )
            }}
          />
        </div>
      ))}
    </div>
  );
}

const getTrendingTags = unstable_cache(
  async () => {
    const result = await prisma.$queryRaw<{ hashtag: string; count: bigint }[]>`
      SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
      FROM posts
      GROUP BY (hashtag)
      ORDER BY count DESC, hashtag ASC
      LIMIT 5
    `;
    return result.map((row) => ({
      hashtag: row.hashtag,
      count: Number(row.count),
    }));
  },
  ["trending_tags"],
  {
    revalidate: 1 * 60 * 60,
  }
);

async function TrendingTags() {
  const trendingTags = await getTrendingTags();
  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-xl font-bold">Xu hướng</div>
      {trendingTags.map(({ hashtag, count }) => {
        const title = hashtag.split("#")[1];

        return <Link key={title} href={`/hashtag/${title}`}>
          <p className="line-clamp-1 break-all font-semibold hover:underline" title={hashtag}>
            {hashtag}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatNumber(count)} bài đăng
          </p>
        </Link>;
      })}
    </div>
  );
}
