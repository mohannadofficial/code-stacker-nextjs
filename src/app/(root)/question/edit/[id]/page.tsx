import { getQuestionById } from "@/actions/question";
import { getUserById } from "@/actions/user";
import QuestionForm from "@/components/form/question-form";

import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs/server";

const EditQuestionPage = async ({ params: { id } }: ParamsProps) => {
  const { userId } = auth();
  if (!userId) return null;
  const mongoUser = await getUserById(userId);
  const questions = await getQuestionById({ questionId: id });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>

      <div className="mt-9">
        <QuestionForm
          type="Edit"
          userId={mongoUser._id}
          questionDetails={JSON.stringify(questions)}
        />
      </div>
    </>
  );
};

export default EditQuestionPage;
