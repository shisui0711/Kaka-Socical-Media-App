import React from 'react'
import { Button } from './ui/button'
import { Bell } from 'lucide-react'
import { Badge } from './ui/badge'

const NotificationButton = () => {
  return (
    <div>
      <Button className='bg-background size-fit p-3 relative rounded-full'>
        <Bell className='text-black' />
        <Badge className='absolute right-0 top-0 !bg-red-400'>1</Badge>
      </Button>
    </div>
  )
}

export default NotificationButton