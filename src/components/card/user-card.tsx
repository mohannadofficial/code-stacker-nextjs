import { getTopInteractedTags } from "@/actions/tag";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Tags from "../tags";
import { Badge } from "../ui/badge";

interface Props {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
  };
}

const UserCard = async ({ user }: Props) => {
  const interactedTags = await getTopInteractedTags({
    userId: JSON.stringify(user._id),
  });
  return (
    <div className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]">
      <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <Link href={`/profile/${user.clerkId}`}>
          <Image
            src={user.picture}
            alt="user profile picture"
            width={100}
            height={100}
            className="mx-auto rounded-full"
          />

          <div className="mt-4 text-center">
            <h3 className="h3-bold text-dark200_light900 line-clamp-1">
              {user.name}
            </h3>
            <p className="body-regular text-dark500_light500 mt-2">
              @{user.username}
            </p>
          </div>
        </Link>
        <div className="mt-5">
          {interactedTags.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2">
              {interactedTags.map((tag: any, index: number) => {
                if (index > 3) {
                  return null;
                } else {
                  return <Tags key={tag._id} _id={tag._id} name={tag.name} />;
                }
              })}
            </div>
          ) : (
            <Badge>No tags yet</Badge>
          )}
        </div>
      </article>
    </div>
  );
};

export default UserCard;
