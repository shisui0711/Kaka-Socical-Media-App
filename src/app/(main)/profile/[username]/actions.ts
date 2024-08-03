"use server"

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { updateUserProfileSchema, UpdateUserProfileValues } from "@/lib/validation";
import { getUserDataSelect } from "@/types";

export async function updateUserProfile(values:UpdateUserProfileValues){
  const validatedValues = updateUserProfileSchema.parse(values);

  const { user } = await validateRequest();

  if(!user) throw new Error("Not authenticated");

  const userExist = await prisma.user.findUnique({
    where: {
      id: user.id
    }
  })
  if(!userExist) throw Error("User not exist")

  if(userExist.usernameLastChange && userExist.usernameLastChange > new Date(new Date().setDate(new Date().getDate() - 30))){
    throw new Error("Bạn chỉ có thể đổi username 1 lần trong 30 ngày")
  }

  const isExistUsername = await prisma.user.findUnique({
    where: {
      username: validatedValues.username
    }
  
  })

  if(isExistUsername) throw new Error("Username đã tồn tại")

  const updatedUser = await prisma.user.update({
    where: { id: user.id},
    data: {
      ...validatedValues,
      displayName: `${validatedValues.firstName} ${validatedValues.lastName}`
    },
    select: getUserDataSelect(user.id)
  })

  if(user.username !== values.username){
    await prisma.user.update({
      where:{
        id: user.id
      },
      data:{
        usernameLastChange: new Date()
      }
    })
  }

  return updatedUser;
}