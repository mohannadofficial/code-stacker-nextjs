"use server";

import Question from "@/db/question.model";
import Tag from "@/db/tag.model";
import User from "@/db/user.model";
import { connectDB } from "@/lib/mongoose";
import { CreateQuestionParams, GetQuestionsParams } from "@/types/shared";
import { revalidatePath } from "next/cache";

export async function getQuestions(params: GetQuestionsParams) {
  try {
    await connectDB();
    const { searchQuery, filter, page = 1, pageSize = 10 } = params;

    const questions = await Question.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });

    return questions;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    await connectDB();

    const { title, content, tags, author, path } = params;

    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true },
      );
      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
  }
}
