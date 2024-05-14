import { getUserById } from "@/actions/user";
import QuestionForm from "@/components/form/question-form";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Ask a Question",
  description: "Ask a question on the Code Stacker platform.",
};

const AskQuestionPage = async () => {
  const { userId: clerkId } = auth();
  if (!clerkId) redirect("/");

  const userId = await getUserById(clerkId);

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <QuestionForm userId={JSON.stringify(userId?._id)} />
      </div>
    </>
  );
};

export default AskQuestionPage;
