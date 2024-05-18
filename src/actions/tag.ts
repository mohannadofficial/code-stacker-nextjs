"use server";

import Interaction from "@/db/interaction.model";
import Question from "@/db/question.model";
import Tag, { ITag } from "@/db/tag.model";
import User from "@/db/user.model";
import { connectDB } from "@/lib/mongoose";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "@/types/shared";
import { FilterQuery } from "mongoose";

export async function getTags(params: GetAllTagsParams) {
  try {
    await connectDB();

    const { searchQuery, filter, page = 1, pageSize = 10 } = params;

    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Tag> = {};

    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }

    let sortOptions = {};

    switch (filter) {
      case "popular":
        sortOptions = { questions: -1 };
        break;
      case "recent":
        sortOptions = { createdAt: -1 };
        break;
      case "name":
        sortOptions = { name: 1 };
        break;
      case "old":
        sortOptions = { createdAt: 1 };
        break;
      default:
        break;
    }

    const tags = await Tag.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalTags = await Tag.countDocuments(query);

    const totalPages = Math.ceil(totalTags / pageSize);

    const isNext = totalTags > skipAmount + tags.length;

    return { tags, isNext, totalPages };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTagById(tagId: string) {
  try {
    await connectDB();

    const tag = await Tag.findById(tagId);

    if (!tag) {
      throw new Error("Tag not found");
    }

    return tag;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    await connectDB();
    const { userId } = params;
    const user = await User.findById(JSON.parse(userId));

    if (!user) throw new Error("User not found");

    // Find the user's interactions where actions equal "ask_question" or "answer" and return tags name without duplicates
    const userInteractions = await Interaction.find({
      user: user._id,
      action: { $in: ["ask_question", "answer"] },
    }).distinct("tags");

    // Extract tags from user's interactions limited to 3 tags
    const tags = await Tag.find({ _id: { $in: userInteractions } }).limit(5);
    // return list of tags
    return tags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    await connectDB();

    const { tagId, page = 1, pageSize = 10, searchQuery } = params;

    const skipAmount = (page - 1) * pageSize;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const tag = await Tag.findOne(tagFilter);

    const totalQuestions = tag.questions.length;

    await tag.populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        sort: { createdAt: -1 },
        skip: skipAmount,
        limit: pageSize,
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!tag) {
      throw new Error("Tag not found");
    }

    const questions = tag.questions;

    const isNext = totalQuestions > skipAmount + questions.length;

    const totalPages = Math.ceil(totalQuestions / pageSize);

    return { tagTitle: tag.name, questions, isNext, totalPages };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getPopularTags() {
  try {
    await connectDB();
    const popularTags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);
    return popularTags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
