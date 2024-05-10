"use server";

import Answer from "@/db/answer.model";
import Question from "@/db/question.model";
import Tag from "@/db/tag.model";
import User from "@/db/user.model";
import { connectDB } from "@/lib/mongoose";
import { SearchParams } from "@/types/shared";

const SearchableTypes = ["question", "answer", "user", "tag"];

export async function searchGlobal(params: SearchParams) {
  try {
    await connectDB();

    const { query, type } = params;
    const regexQuery = { $regex: query, $options: "i" };

    let result = [];

    const modelsAndTypes = [
      { model: Question, searchField: "title", type: "question" },
      { model: User, searchField: "name", type: "user" },
      { model: Answer, searchField: "content", type: "answer" },
      { model: Tag, searchField: "name", type: "tag" },
    ];

    const typeLower = type?.toLowerCase();

    if (!typeLower || !SearchableTypes.includes(typeLower)) {
      // search for everything
      for (const { model, searchField, type } of modelsAndTypes) {
        const queryResults = await model
          .find({ [searchField]: regexQuery })
          .limit(8);

        result.push(
          ...queryResults.map((item) => ({
            title:
              type === "answer"
                ? `Answer containing ${query}`
                : item[searchField],
            type,
            id:
              type === "user"
                ? item.clerkId
                : type === "answer"
                  ? item.question
                  : item._id,
          })),
        );
      }
    } else {
      // search for specific type
      const modelInfo = modelsAndTypes.find((item) => item.type === typeLower);

      if (!modelInfo) {
        throw new Error("Invalid type");
      }

      const queryResults = await modelInfo.model
        .find({ [modelInfo.searchField]: regexQuery })
        .limit(8);

      result = queryResults.map((item) => ({
        title:
          type === "answer"
            ? `Answers containing ${query}`
            : item[modelInfo.searchField],
        type,
        id:
          type === "user"
            ? item.clerkId
            : type === "answer"
              ? item.question
              : item._id,
      }));
    }

    return JSON.stringify(result);
  } catch (error) {
    console.log(`Error in search: ${error}`);
    throw error;
  }
}
