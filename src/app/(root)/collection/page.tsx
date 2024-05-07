import { getSavedQuestions } from "@/actions/user";
import QuestionCard from "@/components/card/question-card";
import Empty from "@/components/empty";
import Filter from "@/components/filter";
import Search from "@/components/search";
import { QuestionFilters } from "@/constants/filters";
import { SearchParamsProps } from "@/types";
import { auth } from "@clerk/nextjs/server";

const CollectionPage = async ({ searchParams }: SearchParamsProps) => {
  const { userId } = auth();
  if (!userId) return null;

  const { collections } = await getSavedQuestions({
    clerkId: userId,
    searchQuery: searchParams.q,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Search
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />

        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {collections.length > 0 ? (
          collections.map((collection: any) => (
            <QuestionCard
              key={collection._id}
              _id={collection._id}
              title={collection.title}
              tags={collection.tags}
              author={collection.author}
              upvotes={collection.upvotes}
              views={collection.views}
              answers={collection.answers}
              createdAt={collection.createdAt}
            />
          ))
        ) : (
          <Empty
            title="There’s no question saved to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
};

export default CollectionPage;
