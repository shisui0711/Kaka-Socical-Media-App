import RightSidebar from '@/components/RightSidebar'
import React from 'react'
import ListNotification from './ListNotification'

const NotificationsPage = () => {
  return (
    <main className='flex w-full min-w-0 gap-5'>
      <div className='w-full min-w-0 space-y-5'>
        <div className='rounded-2xl bg-card p-5 shadow-sm'>
          <h1 className='text-center text-2xl font-bold'>Tất cả thông báo</h1>
        </div>
        <ListNotification/>
      </div>
      <RightSidebar/>
    </main>
  )
}

export default NotificationsPage