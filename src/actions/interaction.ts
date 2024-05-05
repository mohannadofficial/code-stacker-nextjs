"use server";

import Interaction from "@/db/interaction.model";
import Question from "@/db/question.model";
import { connectDB } from "@/lib/mongoose";
import { ViewQuestionParams } from "@/types/shared";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    await connectDB();

    const { questionId, userId } = params;

    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      if (existingInteraction) return console.log("User has already viewed.");

      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
