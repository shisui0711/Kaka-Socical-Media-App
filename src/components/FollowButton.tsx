"use client";

import useFollowerInfo from "@/app/hooks/useFollowerInfo";
import { FollowerInfo } from "@/types";
import React from "react";
import { useToast } from "./ui/use-toast";
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import kyInstance from "@/lib/ky";

interface FollowButtonProps {
  userId: string;
  initialState: FollowerInfo;
}

const FollowButton = ({ userId, initialState }: FollowButtonProps) => {
  const { data } = useFollowerInfo(userId, initialState);
  const { toast } = useToast();

  const queryClient = useQueryClient();
  const queryKey: QueryKey = ["follower-info", userId];

  const { mutate } = useMutation({
    mutationFn: () =>
      data.isFollowedByUser
        ? kyInstance.delete(`/api/users/${userId}/followers`)
        : kyInstance.post(`/api/users/${userId}/followers`),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previousState = queryClient.getQueryData<FollowerInfo>(queryKey);

      queryClient.setQueryData<FollowerInfo>(queryKey, () => ({
        followers:
          (previousState?.followers || 0) +
          (previousState?.isFollowedByUser ? -1 : 1),
        isFollowedByUser: !previousState?.isFollowedByUser,
      }));
      return {previousState}
    },
    onError(error,variables,context){
      queryClient.setQueryData(queryKey, context?.previousState)
      console.log(error)
      if(error.message.includes("429"))
        toast({
          title: "Thao tác quá nhanh. Hãy chậm lại.",
          variant: 'destructive'
        })
      else{
        toast({
          title: "Đã xảy ra lỗi. Vui lòng thử lại sau.",
          variant: 'destructive'
        })
      }
    }
  });

  return (
    <Button
      variant={data.isFollowedByUser ? "outline" : "default"}
      className="border-primary border-2"
      onClick={() => mutate()}
    >
      {data.isFollowedByUser ? "Đã theo dõi" : "Theo dõi"}
    </Button>
  );
};

export default FollowButton;
