import { getUserAnswers } from "@/actions/user";
import { SearchParamsProps } from "@/types";
import AnswerCard from "@/components/card/answer-card";
import Pagination from "./pagination";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswersTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserAnswers({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      {result.answers.map((item) => (
        <AnswerCard
          key={item._id}
          clerkId={clerkId}
          _id={item._id}
          question={item.question}
          author={item.author}
          upvotes={item.upvotes.length}
          createdAt={item.createdAt}
        />
      ))}
      <Pagination
        pageNumber={searchParams.page ? +searchParams.page : 1}
        isNext={result.isNextAnswer}
        totalPages={result.totalPages}
      />
    </>
  );
};

export default AnswersTab;
