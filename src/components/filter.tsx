"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

interface Props {
  filters: { name: string; value: string }[];
  otherClasses?: string;
  containerClasses?: string;
}

const Filter = ({ filters, containerClasses, otherClasses }: Props) => {
  return (
    <div className={cn("relative", containerClasses)}>
      <Select>
        <SelectTrigger
          className={cn(
            "body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5",
            otherClasses,
          )}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a Filter..." />
          </div>
        </SelectTrigger>
        <SelectContent className="background-light800_dark300 text-dark500_light700">
          <SelectGroup>
            {filters.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                className=" p-2.5 hover:rounded-md hover:bg-light-900 hover:shadow-sm 
                dark:hover:bg-dark-400
                "
              >
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
