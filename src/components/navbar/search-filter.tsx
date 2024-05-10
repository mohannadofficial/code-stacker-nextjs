"use client";

import { GlobalSearchFilters } from "@/constants/filters";
import { cn, fromUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import router from "next/router";
import { useState } from "react";

const SearchFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const typeParams = searchParams.get("type");

  const [active, setActive] = useState(typeParams || "");

  const handleClick = (item: string) => {
    if (active === item) {
      setActive("");
      const newUrl = fromUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);

      const newUrl = fromUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: item.toLowerCase(),
      });
      router.push(newUrl, { scroll: false });
    }
  };
  return (
    <div className="flex items-center gap-5 px-5">
      <p className="text-dark400_light900 body-medium">Type: </p>
      <div className="flex gap-3">
        {GlobalSearchFilters.map((item) => (
          <button
            key={item.value}
            type="button"
            className={cn(
              "light-border-2 small-medium :text-light-800 rounded-2xl px-5 py-2 capitalize dark:hover:text-primary-500",
              active === item.value
                ? "bg-primary-500 text-light-900"
                : "dark:bg-dark-500' bg-light-700 text-dark-400 hover:text-primary-500",
            )}
            onClick={() => handleClick(item.value)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchFilter;
