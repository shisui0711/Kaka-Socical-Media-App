import { Prisma } from "@prisma/client";

export interface UserAvatarProps {
  avatarUrl?: string | undefined | null;
  size?: number;
  className?: string;
}

export type PostData = Prisma.PostGetPayload<{
  include: ReturnType<typeof getPostDataInclude>;
}>;

export interface PostsPage {
  posts: PostData[];
  nextCursor: string | null;
}

export interface FollowerInfo {
  followers: number;
  isFollowedByUser: boolean;
}

export function getUserDataSelect(signedInUserId: string) {
  return {
    id: true,
    username: true,
    displayName: true,
    firstName: true,
    lastName: true,
    avatarUrl: true,
    bio: true,
    usernameLastChange: true,
    createAt: true,
    followers: {
      where: {
        followerId: signedInUserId,
      },
      select: {
        followerId: true,
      },
    },
    _count: {
      select: {
        posts: true,
        followers: true,
      },
    },
  } satisfies Prisma.UserSelect;
}

export function getPostDataInclude(signedInUserId: string) {
  return {
    user: {
      select: getUserDataSelect(signedInUserId),
    },
    attachments: true,
    likes: {
      where: {
        userId: signedInUserId,
      },
      select: {
        userId: true,
      },
    },
    bookmarks: {
      where: {
        userId: signedInUserId,
      },
      select: {
        userId: true,
      },
    },
    _count: {
      select: {
        likes: true,
        comments: true
      },
    },
  } satisfies Prisma.PostInclude;
}

export function getCommentDataInclude(signedInUserId: string) {
  return {
    user: {
      select: getUserDataSelect(signedInUserId),
    },
  } satisfies Prisma.CommentInclude;
}

export type CommentData = Prisma.CommentGetPayload<{
  include: ReturnType<typeof getCommentDataInclude>;
}>;

export type UserData = Prisma.UserGetPayload<{
  select: ReturnType<typeof getUserDataSelect>;
}>;

export interface CommentsPage {
  comments: CommentData[];
  previousCursor: string | null;
}

export interface Attachment {
  file: File;
  mediaId?: string;
  isUploading: boolean;
}

export interface LikeInfo {
  likes: number;
  isLikedByUser: boolean;
}

export interface BookmarkInfo {
  isBookmarkedByUser: boolean;
}

export const notificationInclude = {
  issuer: {
    select: {
      username: true,
      displayName: true,
      avatarUrl: true,
    }
  },
  post: {
    select: {
      content: true,
      id: true
    }
  }
} satisfies Prisma.NotificationInclude

export type NotificationData = Prisma.NotificationGetPayload<{
  include: typeof notificationInclude
}>

export interface NotificationsPage{
  notifications: NotificationData[];
  nextCursor: string | null;
}