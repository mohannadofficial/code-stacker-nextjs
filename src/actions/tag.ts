"use server";

import Tag from "@/db/tag.model";
import User from "@/db/user.model";
import { connectDB } from "@/lib/mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "@/types/shared";

export async function getTags(params: GetAllTagsParams) {
  try {
    await connectDB();

    const tags = await Tag.find({});

    return { tags };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    await connectDB();

    const { userId } = params;
    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    // TODO: TAG IMPLEMENT

    return [
      { _id: "1", name: "tag" },
      { _id: "2", name: "tag2" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}
