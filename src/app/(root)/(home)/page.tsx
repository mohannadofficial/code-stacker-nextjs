import Empty from "@/components/empty";
import Filter from "@/components/filter";
import HomeFilter from "@/components/home-filter";
import QuestionCard from "@/components/question-card";
import Search from "@/components/search";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";

const questions = [
  {
    _id: "1",
    title: "Cascading Deletes in SQLAlchemy?",
    tags: [
      { _id: "1", name: "python" },
      { _id: "2", name: "sql" },
    ],
    author: {
      _id: "1",
      name: "John Doe",
      picture: "john-doe.jpg",
    },
    upvotes: 1500000,
    views: 500552,
    answers: [],
    createdAt: new Date("2023-09-01T12:00:00.000Z"),
  },
  {
    _id: "2",
    title: "How to center a div?",
    tags: [
      { _id: "3", name: "css" },
      { _id: "4", name: "html" },
    ],
    author: {
      _id: "2",
      name: "Jane Smith",
      picture: "jane-smith.jpg",
    },
    upvotes: 5,
    views: 50,
    answers: [],
    createdAt: new Date("2021-09-02T10:30:00.000Z"),
  },
];

const HomePage = () => {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900 text-center ">
          All Questions
        </h1>
        <Button variant="primaryGradient">Ask a Question</Button>
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
        {questions.length > 0 ? (
          questions.map((questions) => (
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
    </>
  );
};

export default HomePage;
