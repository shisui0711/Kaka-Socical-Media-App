import { Loader2 } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='flex-center h-screen'>
      <Loader2 className='mx-auto my-3 animate-spin'/>
    </div>
  )
}

export default Loading