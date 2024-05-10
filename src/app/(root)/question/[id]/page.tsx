import { getQuestionById } from "@/actions/question";
import { getUserById } from "@/actions/user";
import Answers from "@/components/answers";
import Edit from "@/components/edit";
import AnswerForm from "@/components/form/answer-form";
import Metric from "@/components/metric";
import ParseHTML from "@/components/parse-html";
import Tags from "@/components/tags";
import Votes from "@/components/votes";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { URLProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

const QuestionPage = async ({ params, searchParams }: URLProps) => {
  const { userId: clerkId } = auth();

  let mongoUser;

  if (clerkId) {
    mongoUser = await getUserById(clerkId);
  }

  const question = await getQuestionById({ questionId: params.id });

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile${question.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={question.author.picture}
              alt="profile"
              width={22}
              height={22}
              className="rounded-full"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {question.author.name}
            </p>
          </Link>
          <div className="flex justify-end gap-4">
            <Votes
              type="Question"
              itemId={JSON.stringify(question._id)}
              userId={JSON.stringify(mongoUser?._id)}
              upvotes={question.upvotes.length}
              hasupVoted={question.upvotes.includes(mongoUser?._id)}
              downvotes={question.downvotes.length}
              hasdownVoted={question.downvotes.includes(mongoUser?._id)}
              hasSaved={mongoUser?.saved.includes(question._id)}
            />
            {clerkId === mongoUser?.clerkId && (
              <Edit itemId={JSON.stringify(question._id)} />
            )}
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {question.title}
        </h2>
      </div>

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={` asked ${getTimestamp(question.createdAt)}`}
          title=" Asked"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatAndDivideNumber(question.answers.length)}
          title=" Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatAndDivideNumber(question.views)}
          title=" Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>

      <ParseHTML data={question.content} />

      <div className="mt-8 flex flex-wrap gap-2">
        {question.tags.map((tag: any) => (
          <Tags key={tag._id} _id={tag._id} name={tag.name} showCount={false} />
        ))}
      </div>

      <div className="mt-8 border-b dark:border-b-gray-600" />

      <Answers
        questionId={question._id}
        userId={mongoUser?._id}
        totalAnswers={question.answers.length}
      />

      {mongoUser && (
        <AnswerForm
          question={question.content}
          questionId={JSON.stringify(question._id)}
          authorId={JSON.stringify(mongoUser?._id)}
        />
      )}
    </>
  );
};

export default QuestionPage;
