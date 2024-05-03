"use server";

import User from "@/db/user.model";
import { connectDB } from "@/lib/mongoose";
import { GetTopInteractedTagsParams } from "@/types/shared";

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
