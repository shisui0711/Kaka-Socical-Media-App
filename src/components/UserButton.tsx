"use client"

import { useSession } from '@/providers/SessionProvider'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import UserAvatar from './UserAvatar'
import Link from 'next/link'
import { LogOut, User2 } from 'lucide-react'
import { SignOut } from '@/app/(auth)/actions'
import { useQueryClient } from '@tanstack/react-query'


const UserButton = ({ className }: { className?:string }) => {
  const { user } = useSession()

  const queryClient = useQueryClient()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='outline-none'>
          <UserAvatar avatarUrl={user.avatarUrl}/>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={`/profile/${user.username}`} className='flex gap-2'>
            <User2 className='size-4'/>
            Trang cá nhân
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator/>
        <DropdownMenuItem className='flex gap-2' onClick={()=>{
          queryClient.clear();
          SignOut();
          }}>
          <LogOut />
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton