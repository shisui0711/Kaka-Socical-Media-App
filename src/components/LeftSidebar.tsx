  "use client";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Bell, Bookmark, Home, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession } from "@/providers/SessionProvider";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const LeftSidebar = ({ className }: { className?: string }) => {
  const { user } = useSession();

  return (
    <div
      className={cn(
        "sticky top-[5.25rem] left-5 h-fit hidden md:block w-[300px] p-2 flex-none space-y-3 rounded-2xl bg-card shadow-sm",
        className
      )}
    >
      <Button variant="ghost" className="flex items-center justify-start w-full gap-3 h-fit py-3">
        <Link href={`/profile/${user.username}`} className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user.avatarUrl} className=""/>
            <AvatarFallback ><User/></AvatarFallback>
          </Avatar>
          <span>{user.displayName}</span>
        </Link>
      </Button>
      <Button variant="ghost" className="flex items-center justify-start w-full gap-3">
        <Link href="/" className="flex items-center gap-3">
          <Home />
          <span>Trang chủ</span>
        </Link>
      </Button>
      <Button variant="ghost" className="flex items-center justify-start w-full gap-3">
        <Link href="/notifications" className="flex items-center gap-3">
          <Bell />
          <span>Thông báo</span>
        </Link>
      </Button>
      <Button variant="ghost" className="flex items-center justify-start w-full gap-3">
        <Link href="/bookmarked" className="flex items-center gap-3">
          <Bookmark />
          <span>Đã lưu</span>
        </Link>
      </Button>
    </div>
  );
};

export default LeftSidebar;
