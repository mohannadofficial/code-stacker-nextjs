import { getQuestions, getRecommendedQuestions } from "@/actions/question";
import Empty from "@/components/empty";
import Filter from "@/components/filter";
import HomeFilter from "@/components/home-filter";
import QuestionCard from "@/components/card/question-card";
import Search from "@/components/search";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
import { SearchParamsProps } from "@/types";
import Pagination from "@/components/pagination";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Home page of the Code Stacker platform.",
};

const HomePage = async ({ searchParams }: SearchParamsProps) => {
  const { userId } = auth();

  let result;

  if (searchParams?.filter === "recommended") {
    if (userId) {
      result = await getRecommendedQuestions({
        userId,
        searchQuery: searchParams.q,
        page: searchParams.page ? +searchParams.page : 1,
      });
    } else {
      result = {
        questions: [],
        isNext: false,
      };
    }
  } else {
    result = await getQuestions({
      searchQuery: searchParams.q,
      filter: searchParams.filter,
      page: searchParams.page ? +searchParams.page : 1,
    });
  }

  return (
    <>
      <div className=" flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900 text-center ">
          All Questions
        </h1>
        <Button variant="primaryGradient">
          <Link href="/ask-question">Ask a Question</Link>
        </Button>
      </div>
      <div className="mt-11 flex justify-center gap-5 max-sm:flex-col sm:items-center">
        <Search
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilter filters={HomePageFilters} />
      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((questions) => (
            <QuestionCard
              key={questions._id}
              _id={questions._id}
              answers={questions.answers}
              author={questions.author}
              createdAt={questions.createdAt}
              tags={questions.tags}
              title={questions.title}
              upvotes={questions.upvotes}
              views={questions.views}
            />
          ))
        ) : (
          <Empty
            title="There's no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
      <Pagination
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
        totalPages={result.totalPages || 1}
      />
    </>
  );
};

export default HomePage;
