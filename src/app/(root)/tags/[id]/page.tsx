import { getQuestionsByTagId } from "@/actions/tag";
import Page from "@/app/(auth)/sign-in/[[...sign-in]]/page";
import QuestionCard from "@/components/card/question-card";
import Empty from "@/components/empty";
import Search from "@/components/search";
import { IQuestion } from "@/db/question.model";
import { URLProps } from "@/types";

const QuestionByTagPage = async ({ params, searchParams }: URLProps) => {
  const { questions, tagTitle } = await getQuestionsByTagId({
    tagId: params.id,
    page: 1,
    searchQuery: searchParams.q,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{tagTitle}</h1>

      <div className="mt-11 w-full">
        <Search
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search tag questions"
          otherClasses="flex-1"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question: IQuestion) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              // TODO:FIX THIS ANY TO THESES THREE LINE
              tags={question.tags as any}
              author={question.author as any}
              upvotes={question.upvotes as any}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <Empty
            title="There’s no tag question saved to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
};

export default QuestionByTagPage;
