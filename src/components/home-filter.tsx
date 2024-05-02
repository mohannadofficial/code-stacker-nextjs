"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface Props {
  filters: { name: string; value: string }[];
}

const HomeFilter = ({ filters }: Props) => {
  const active = "frequent";
  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {filters.map((item) => (
        <Button
          key={item.value}
          onClick={() => {}}
          className={cn(
            "body-medium rounded-lg px-6 py-3 capitalize shadow-none",
            active === item.value
              ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400"
              : "bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300",
          )}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilter;
