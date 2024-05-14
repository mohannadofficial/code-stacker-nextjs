import { fetchCountries, fetchJobs, fetchLocation } from "@/actions/job";
import JobCard from "@/components/card/job-card";
import JobsFilter from "@/components/job-filter";
import Pagination from "@/components/pagination";
import { Job } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jobs",
  description: "Jobs page of the Code Stacker platform.",
};

interface Props {
  searchParams: {
    q: string;
    location: string;
    page: string;
  };
}

const JobsPage = async ({ searchParams }: Props) => {
  const userLocation = await fetchLocation();
  const { jobs, totalPages } = await fetchJobs({
    query:
      `${searchParams.q}, ${searchParams.location}` ??
      `Software Engineer in ${userLocation}`,
    page: searchParams.page ?? 1,
  });

  const countries = await fetchCountries();
  const page = parseInt(searchParams.page ?? 1);

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Jobs</h1>

      <div className="flex">
        <JobsFilter countriesList={countries} />
      </div>

      <section className="light-border mb-9 mt-11 flex flex-col gap-9 border-b pb-9">
        {jobs.length > 0 ? (
          jobs.map((job: Job, index: number) => {
            if (job.job_title && job.job_title.toLowerCase() !== "undefined")
              return <JobCard key={index} job={job} />;

            return null;
          })
        ) : (
          <div className="paragraph-regular text-dark200_light800 w-full text-center">
            Oops! We couldn&apos;t find any jobs at the moment. Please try again
            later
          </div>
        )}
      </section>

      {jobs.length > 0 && (
        <Pagination
          pageNumber={page}
          isNext={jobs.length === 10}
          totalPages={jobs.length / 10}
        />
      )}
    </>
  );
};

export default JobsPage;
