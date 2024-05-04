import Image from "next/image";
import { Input } from "@/components/ui/input";

const Search = () => {
  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4 dark:bg-dark-200">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          height={24}
          width={24}
          className="cursor-pointer"
        />
        <Input
          type="text"
          placeholder="Search anything globally..."
          defaultValue=""
          className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none  outline-none dark:bg-dark-200 dark:text-white"
        />
      </div>
    </div>
  );
};

export default Search;
