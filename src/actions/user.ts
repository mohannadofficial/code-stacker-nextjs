"use server";

import Question from "@/db/question.model";
import User from "@/db/user.model";
import { connectDB } from "@/lib/mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  UpdateUserParams,
} from "@/types/shared";
import { revalidatePath } from "next/cache";

export async function getUserById(userId: string) {
  try {
    await connectDB();

    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function createUser(user: CreateUserParams) {
  try {
    await connectDB();

    const newUser = await User.create(user);
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    await connectDB();

    const { clerkId, updateData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    await connectDB();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    const userQuestionIds = await Question.find({ author: user._id }).distinct(
      "_id",
    );

    await Question.deleteMany({ author: user._id });

    const deletedUser = await User.findByIdAndDelete(user._id);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
