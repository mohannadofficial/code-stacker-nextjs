"use server";

import Answer from "@/db/answer.model";
import Question from "@/db/question.model";
import Tag from "@/db/tag.model";
import User from "@/db/user.model";
import { connectDB } from "@/lib/mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  GetUserStatsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "@/types/shared";
import { Error, FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";

export async function getUsers(params: GetAllUsersParams) {
  try {
    await connectDB();

    const users = await User.find({}).sort({ createdAt: -1 });

    return { users };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

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

export async function toggleSaveQuestions(params: ToggleSaveQuestionParams) {
  try {
    await connectDB();

    const { userId, questionId, path } = params;

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    const isQuestionSaved = user.saved.includes(questionId);

    if (isQuestionSaved) {
      await User.findByIdAndUpdate(
        userId,
        { $pull: { saved: questionId } },
        { new: true },
      );
    } else {
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { saved: questionId } },
        { new: true },
      );
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    await connectDB();

    const { clerkId, page = 1, pageSize = 10, filter, searchQuery } = params;

    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $reges: new RegExp(searchQuery, "i") } }
      : {};

    const user = await User.findOne({ clerkId }).populate({
      path: "saved",
      match: query,
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!user) {
      throw new Error("User not found");
    }

    const savedQuestions = user.saved;

    return { collections: savedQuestions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    await connectDB();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      throw new Error("User not found");
    }

    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id });

    return { user, totalQuestions, totalAnswers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserQuestions(params: GetUserStatsParams) {
  try {
    await connectDB();

    const { userId, page = 1, pageSize = 10 } = params;

    const totalQuestions = await Question.countDocuments({ author: userId });

    const userQuestions = await Question.find({ author: userId })
      .sort({ views: -1, upvotes: -1 })
      .populate("tags", "_id name")
      .populate("author", "_id clerkId name picture");

    return { totalQuestions, questions: userQuestions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserAnswers(params: GetUserStatsParams) {
  try {
    await connectDB();

    const { userId, page = 1, pageSize = 10 } = params;

    const totalAnswers = await Answer.countDocuments({ author: userId });

    const userAnswers = await Answer.find({ author: userId })
      .sort({ upvotes: -1 })
      .populate("question", "_id title")
      .populate("author", "_id clerkId name picture");

    return { totalAnswers, answers: userAnswers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
