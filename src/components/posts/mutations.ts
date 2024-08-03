import { PostData, PostsPage } from "@/types";
import { useToast } from "../ui/use-toast";
import { InfiniteData, QueryFilters, useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { deletePost } from "./actions";

export function useDeletePostMutation(post: PostData){
  const { toast } = useToast()

  const queryClient = useQueryClient()
  const router = useRouter()
  const pathname = usePathname()

  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: async (deletedPost) => {
      const queryFilter: QueryFilters = {
        queryKey: ["post-feed"],
      }
      await queryClient.cancelQueries(queryFilter)

      queryClient.setQueriesData<InfiniteData<PostsPage,string|null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;
          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextCursor: page.nextCursor,
              posts: page.posts.filter((post) => post.id !== deletedPost.id)
            }))
          }
        }
      )
      
      toast({
        title: "Xóa bài viết thành công",
        className: "bg-primary text-white",
      })

      if(pathname === `/posts/${deletedPost.id}`){
        router.push('/')
      }
    },
    onError: (error) => {
      console.log(error)
      toast({
        title: "Có lỗi xảy ra. Vui lòng thử lại",
        variant: "destructive"
      })
    }
  })
  return mutation
}