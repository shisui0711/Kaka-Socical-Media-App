import { PostData } from '@/types'
import React from 'react'
import DeletePostDialog from './DeletePostDialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import { MoreHorizontal, Trash } from 'lucide-react'

interface PostMoreButtonProps {
  post: PostData,
  className?: string

}

const PostMoreButton = ({ post, className }:PostMoreButtonProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)



  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size='icon' variant='ghost' className={className}>
            <MoreHorizontal className='size-5 text-muted-foreground'/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={()=> setShowDeleteDialog(true)}>
            <span className='flex items-center gap-3 text-destructive'>
              <Trash className='size-4'/>
              Xóa
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeletePostDialog post={post} open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}  />
    </div>
  )
}

export default PostMoreButton