import { validateRequest } from "@/auth";
import Navbar from "@/components/Navbar";
import SessionProvider from "@/providers/SessionProvider";
import { redirect } from "next/navigation";
import React from "react";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await validateRequest();
  if (!session.user) redirect("/sign-in");

  return (
    <SessionProvider value={session}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="py-3 flex w-full grow gap-5 relative">
          <LeftSidebar />
          <div className="px-3 w-full overflow-y-auto">{children}</div>
        </div>
      </div>
    </SessionProvider>
  );
}
