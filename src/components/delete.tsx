"use client";

import { deleteAnswer } from "@/actions/answer";
import { deleteQuestion } from "@/actions/question";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface Props {
  type: "Question" | "Answer";
  itemId: string;
}

const Delete = ({ type, itemId }: Props) => {
  const pathname = usePathname();
  const handleDelete = async () => {
    if (type === "Question") {
      await deleteQuestion({
        questionId: JSON.parse(itemId),
        path: pathname,
      });
    } else if (type === "Answer") {
      await deleteAnswer({
        answerId: JSON.parse(itemId),
        path: pathname,
      });
    }
  };

  return (
    <Image
      src="/assets/icons/trash.svg"
      alt="Delete"
      width={14}
      height={14}
      className="cursor-pointer object-contain"
      onClick={handleDelete}
    />
  );
};

export default Delete;
