import { getTags } from "@/actions/tag";
import Empty from "@/components/empty";
import Filter from "@/components/filter";
import Pagination from "@/components/pagination";
import Search from "@/components/search";
import { TagFilters } from "@/constants/filters";
import { SearchParamsProps } from "@/types";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tags",
  description: "Tags page of the Code Stacker platform.",
};

const TagsPage = async ({ searchParams }: SearchParamsProps) => {
  const { tags, isNext, totalPages } = await getTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Tags</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Search
          route="/tags"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for tags"
          otherClasses="flex-1"
        />

        <Filter
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {tags.length > 0 ? (
          tags.map((tag) => (
            <Link
              href={`/tags/${tag._id}`}
              key={tag._id}
              className="shadow-light100_darknone"
            >
              <article className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]">
                <div className="background-light800_dark400 w-fit rounded-sm px-5 py-1.5">
                  <p className="paragraph-semibold text-dark300_light900">
                    {tag.name}
                  </p>
                </div>

                <p className="small-medium text-dark400_light500 mt-3.5">
                  <span className="body-semibold primary-text-gradient mr-2.5">
                    {tag.questions.length}+
                  </span>
                  Questions
                </p>
              </article>
            </Link>
          ))
        ) : (
          <Empty
            title="No Tags Found"
            description="It looks like there are no tags found."
            link="/ask-question"
            linkTitle="Ask a question"
          />
        )}
      </section>
      <Pagination
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={isNext}
        totalPages={totalPages}
      />
    </>
  );
};

export default TagsPage;
