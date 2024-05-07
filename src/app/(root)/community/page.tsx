import { getUsers } from "@/actions/user";
import Filter from "@/components/filter";
import Search from "@/components/search";
import UserCard from "@/components/card/user-card";
import { UserFilters } from "@/constants/filters";
import Link from "next/link";
import React from "react";
import { SearchParamsProps } from "@/types";

const CommunityPage = async ({ searchParams }: SearchParamsProps) => {
  const { users } = await getUsers({
    searchQuery: searchParams.q,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <Search
          route="/community"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for amazing minds"
          otherClasses="flex-1"
        />

        <Filter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {users.length > 0 ? (
          users.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No users yet</p>
            <Link href="/sign-up" className="mt-2 font-bold text-accent-blue">
              Join to be the first!
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export default CommunityPage;
