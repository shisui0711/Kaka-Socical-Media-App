import { useToast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { UpdateUserProfileValues } from "@/lib/validation";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { updateUserProfile } from "./actions";
import { PostsPage } from "@/types";

export function useUpdateProfileMutation() {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { startUpload: startAvatarUpload } = useUploadThing("avatar");
  const mutation = useMutation({
    mutationFn: async ({
      values,
      avatar,
    }: {
      values: UpdateUserProfileValues;
      avatar?: File;
    }) => {
      return Promise.all([
        updateUserProfile(values),
        avatar && startAvatarUpload([avatar]),
      ]);
    },
    onSuccess: async ([updatedUser, uploadResult]) => {
      const newAvatarUrl = uploadResult?.[0].serverData.avatarUrl;

      const queryFilter: QueryFilters = {
        queryKey: ["post-feed"],
      };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;
          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextCursor: page.nextCursor,
              posts: page.posts.map((posts) => {
                if (posts.user.id === updatedUser.id) {
                  return {
                    ...posts,
                    user: {
                      ...updatedUser,
                      avatarUrl: newAvatarUrl || updatedUser.avatarUrl,
                    },
                  };
                }
                return posts;
              }),
            })),
          };
        }
      );

      router.push(`/profile/${updatedUser.username}`);

      toast({
        description: "Cập nhật thông tin thành công",
      });
    },
    onError(error) {
      console.log(error);
      if (error.message === "Bạn chỉ có thể đổi username 1 lần trong 30 ngày") {
        toast({
          description: error.message,
          variant: "destructive",
        });
      } else if (error.message === "Username đã tồn tại") {
        toast({
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          description: "Có lỗi xảy ra. Vui lòng thử lại.",
          variant: "destructive",
        });
      }
    },
  });

  return mutation;
}
