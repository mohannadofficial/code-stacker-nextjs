"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { fromUrlQuery } from "@/lib/utils";

interface Props {
  isNext: boolean;
  pageNumber: number;
  totalPages: number;
}

const Pagination = ({ isNext, pageNumber, totalPages }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  let prevElipsis = false;

  const handleNavigation = (
    direction: "num" | "prev" | "next",
    number?: number,
  ) => {
    let nextPage = 1;
    if (direction === "prev") {
      nextPage = pageNumber - 1;
    } else if (direction === "next") {
      nextPage = pageNumber + 1;
    } else if (direction === "num" && number) {
      nextPage = number;
    } else {
      return;
    }

    const newUrl = fromUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPage.toString(),
    });

    router.push(newUrl);
  };

  if (!isNext && pageNumber === 1) return null;

  const handlePrevNumber = () => {
    let number = [];
    for (let i = pageNumber - 1; i > 0; i--) {
      if (number.length === 1) {
        prevElipsis = true;
        break;
      }
      number.push(
        <Button
          key={i}
          disabled={pageNumber === i}
          onClick={() => handleNavigation("num", i)}
          variant={pageNumber === i ? "paginationNumber" : "pagination"}
          size="sm"
        >
          {i}
        </Button>,
      );
    }
    return number.reverse();
  };

  const handleNumber = () => {
    let numbers = [];
    if (pageNumber + 1 <= totalPages) {
      numbers = [];
      for (let i = pageNumber + 1; i <= totalPages; i++) {
        if (numbers.length === 1) {
          prevElipsis = true;
          break;
        }
        numbers.push(
          <Button
            key={i}
            disabled={pageNumber === i}
            onClick={() => handleNavigation("num", i)}
            variant={pageNumber === i ? "paginationNumber" : "pagination"}
            size="sm"
          >
            {i}
          </Button>,
        );
      }
    }
    return numbers;
  };

  return (
    <div className="mt-6 flex w-full items-center justify-center gap-2">
      {pageNumber - 1 !== 1 && pageNumber - 1 > 0 && (
        <Button
          disabled={false}
          onClick={() => handleNavigation("num", 1)}
          variant={"pagination"}
          size="sm"
        >
          {"<<"}
        </Button>
      )}

      <Button
        disabled={pageNumber <= 1}
        onClick={() => handleNavigation("prev")}
        variant={"pagination"}
        size="sm"
      >
        {"<"}
      </Button>
      {pageNumber - 3 >= 1 && (
        <Button
          disabled={false}
          onClick={() => {}}
          variant={"pagination"}
          size="sm"
        >
          ...
        </Button>
      )}
      {pageNumber - 1 !== 1 && pageNumber - 1 > 0 && (
        <Button
          disabled={false}
          className="cursor-text"
          variant={"pagination"}
          size="sm"
        >
          ...
        </Button>
      )}
      {handlePrevNumber()}
      <div className="flex items-center justify-center rounded-md bg-primary-500 px-3.5 py-2">
        <p className="body-semibold text-light-900">{pageNumber}</p>
      </div>

      {handleNumber()}
      {pageNumber + 1 < totalPages && (
        <Button
          disabled={false}
          variant={"pagination"}
          size="sm"
          className="cursor-text"
        >
          ...
        </Button>
      )}
      <Button
        disabled={!isNext}
        onClick={() => handleNavigation("next")}
        variant={"pagination"}
        size="sm"
      >
        {">"}
      </Button>
      {pageNumber + 1 < totalPages && (
        <Button
          disabled={false}
          onClick={() => handleNavigation("num", totalPages)}
          variant={"pagination"}
          size="sm"
        >
          {">>"}
        </Button>
      )}
    </div>
  );
};

export default Pagination;
