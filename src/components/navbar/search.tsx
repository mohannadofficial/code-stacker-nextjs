"use client";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { fromUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import SearchResult from "./search-result";

const Search = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchRef = useRef(null);

  const query = searchParams.get("q");

  const [search, setSearch] = useState(query || "");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (
        searchRef.current &&
        // @ts-ignore
        !searchRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };

    setIsOpen(false);

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [pathname]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = fromUrlQuery({
          params: searchParams.toString(),
          key: "search",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["search", "type"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search, router, pathname, searchParams, query]);

  return (
    <div
      className="relative w-full max-w-[600px] max-lg:hidden"
      ref={searchRef}
    >
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
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!isOpen) setIsOpen(true);
            if (e.target.value === "" && isOpen) setIsOpen(false);
          }}
          className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none  outline-none dark:bg-dark-200 dark:text-white"
        />
      </div>
      {isOpen && <SearchResult />}
    </div>
  );
};

export default Search;
