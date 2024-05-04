import { cn } from "@/lib/utils";
import Image from "next/image";
import { Input } from "@/components/ui/input";

interface Props {
  route: string;
  iconPosition: "left" | "right";
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}

const Search = ({
  iconPosition,
  imgSrc,
  placeholder,
  route,
  otherClasses,
}: Props) => {
  return (
    <div
      className={cn(
        "background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4",
        otherClasses,
        iconPosition === "right" && "flex-row-reverse",
      )}
    >
      <Image
        src={imgSrc}
        alt="search icon"
        width={24}
        height={24}
        className="cursor-pointer"
      />
      <Input
        type="text"
        placeholder={placeholder}
        defaultValue=""
        className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none dark:bg-dark-200 dark:text-white"
      />
    </div>
  );
};

export default Search;
