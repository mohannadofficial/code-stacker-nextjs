import { getUserQuestions } from "@/actions/user";
import { SearchParamsProps } from "@/types";
import QuestionCard from "./card/question-card";
import Pagination from "./pagination";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const QuestionTab = async ({ searchParams, userId, clerkId }: Props) => {
  const { questions, isNextQuestion, totalPages } = await getUserQuestions({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      {questions.map((question) => (
        <QuestionCard
          key={question._id}
          _id={question._id}
          clerkId={clerkId!}
          title={question.title}
          tags={question.tags}
          author={question.author}
          upvotes={question.upvotes}
          views={question.views}
          answers={question.answers}
          createdAt={question.createdAt}
        />
      ))}
      <Pagination
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={isNextQuestion}
        totalPages={totalPages}
      />
    </>
  );
};

export default QuestionTab;
